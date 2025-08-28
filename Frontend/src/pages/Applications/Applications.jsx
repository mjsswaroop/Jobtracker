// import { useEffect, useState } from "react";
// import "./Applications.css";
// import { useContext } from "react";
// import { useRef } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import { API_BASE_URL } from "../../config/config";
// import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
// import NotesModal from "../../components/NotesModal/NotesModal";

// function Applications() {
//   const { user } = useContext(AuthContext);
//   const [applications, setApplications] = useState([]);
//   const [formData, setFormData] = useState({
//     companyName: "",
//     positionTitle: "",
//     status: "Applied",
//     notes: "",
//     website: "",
//     userId: "",
//   });
//   const [activeNoteHtml, setActiveNoteHtml] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [selectedUserId, setSelectedUserId] = useState("");
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [appToDelete, setAppToDelete] = useState(null);
//   const formRef = useRef(null);


//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     fetch(`${API_BASE_URL}/applications`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => setApplications(data))
//       .catch((err) => console.error("Error fetching applications:", err));

//     // ✅ Set userId for logged-in user if not admin
//     if (user?.role !== "admin") {
//       setFormData((prev) => ({ ...prev, userId: user?._id }));
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const method = editMode ? "PATCH" : "POST";
//     const url = editMode
//       ? `${API_BASE_URL}/applications/${editId}`
//       : `${API_BASE_URL}/applications`;

//     // ✅ Inject userId for non-admins just before sending
//     const submissionData = {
//       ...formData,
//       userId: user?.role === "admin" ? formData.userId : user?._id,
//     };
//     fetch(url, {
//       method,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//       body: JSON.stringify(submissionData),
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         if (editMode) {
//           setApplications(
//             applications.map((app) => (app._id === editId ? result : app))
//           );
//           setEditMode(false);
//           setEditId(null);
//         } else {
//           setApplications([...applications, result]);
//         }
//         setFormData({
//           companyName: "",
//           positionTitle: "",
//           status: "Applied",
//           notes: "",
//           website: "",
//           userId: user?.role === "admin" ? "" : user?._id, // Reset properly
//         });
//       })
//       .catch((err) => console.error("Error submitting application:", err));
//   };

//   const confirmDelete = (id) => {
//     setAppToDelete(id);
//     setShowConfirm(true);
//   };

//   const handleDeleteConfirmed = () => {
//     console.log("DELETE confirmed for:", appToDelete);
//     fetch(`${API_BASE_URL}/applications/${appToDelete}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     })
//       .then(() => {
//         setApplications(applications.filter((app) => app._id !== appToDelete));
//         setAppToDelete(null);
//         setShowConfirm(false);
//       })
//       .catch((err) => console.error("Error deleting application:", err));
//   };

//  const handleEdit = (app) => {
//   setEditMode(true);
//   setEditId(app._id);
//   setFormData({
//     companyName: app.companyName,
//     positionTitle: app.positionTitle,
//     status: app.status,
//     notes: app.notes,
//     website: app.website,
//     userId: app.userId,
//   });

//   // Scroll to form
//   setTimeout(() => {
//     formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//   }, 100); // slight delay ensures layout is ready
// };

//   const filteredApplications =
//     user?.role === "admin" && selectedUserId
//       ? applications.filter((app) => app.userId._id === selectedUserId)
//       : applications;

//   return (
//     <div className="applications-container">
//       {activeNoteHtml && (
//         <NotesModal
//           htmlContent={activeNoteHtml}
//           onClose={() => setActiveNoteHtml(null)}
//         />
//       )}

//       {showConfirm && (
//         <ConfirmModal
//           onConfirm={handleDeleteConfirmed}
//           onCancel={() => setShowConfirm(false)}
//         />
//       )}
//       <h1>Applications</h1>

// <form ref={formRef} onSubmit={handleSubmit} className="application-form">
//         <input
//           type="text"
//           name="companyName"
//           placeholder="Company Name"
//           value={formData.companyName}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="positionTitle"
//           placeholder="Position Title"
//           value={formData.positionTitle}
//           onChange={handleChange}
//           required
//         />
//         <select name="status" value={formData.status} onChange={handleChange}>
//           <option value="Applied">Applied</option>
//           <option value="Interviewing">Interviewing</option>
//           <option value="Offer">Offer</option>
//           <option value="Rejected">Rejected</option>
//         </select>

//         <input
//           type="text"
//           name="website"
//           placeholder="Company Website"
//           value={formData.website}
//           onChange={handleChange}
//         />
// <div className="editor-wrapper">
// <div
//   contentEditable
//   className="clean-notes-editor"
//   onInput={(e) =>
//     setFormData({ ...formData, notes: e.currentTarget.innerHTML })
//   }
//   dangerouslySetInnerHTML={{ __html: formData.notes }}
// ></div>

// </div>

//         {user?.role === "admin" && (
//           <select
//             value={selectedUserId}
//             onChange={(e) => setSelectedUserId(e.target.value)}
//             style={{ padding: "8px", margin: "10px 0" }}
//           >
//             <option value="">All Users</option>
//             {[
//               ...new Map(
//                 applications
//                   .filter((app) => app.userId) // ✅ only include apps with user info
//                   .map((app) => [app.userId._id, app.userId])
//               ).values(),
//             ].map((u) => (
//               <option key={u._id} value={u._id}>
//                 {u.name}
//               </option>
//             ))}
//           </select>
//         )}

//         <button type="submit">
//           {editMode ? "Update Application" : "Add Application"}
//         </button>
//       </form>

//       <table className="applications-table">
//         <thead>
//           <tr>
//           <th>#</th>
//             <th>Company</th>
//             <th>Position</th>
//             <th>Date</th>
//             <th>Status</th>
//             <th>Website</th>
//             <th>Notes</th>
//             {user?.role === "admin" && <th>User</th>}
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//   {filteredApplications.map((app, index) => (
//     <tr key={app._id}>
//       <td>{index + 1}</td> {/* New index number */}
//       <td className="app-company">{app.companyName}</td>
//       <td className="app-position">{app.positionTitle}</td>
//       <td className="app-date">
//         {app.dateApplied
//           ? new Date(app.dateApplied).toLocaleDateString()
//           : "N/A"}
//       </td>
//       <td>
//         <span className={`status-tag ${app.status.toLowerCase()}`}>
//           {app.status}
//         </span>
//       </td>
//       <td className="app-website">
//         {app.website ? (
//           <a
//             href={
//               app.website.startsWith("http")
//                 ? app.website
//                 : `https://${app.website}`
//             }
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             {app.website}
//           </a>
//         ) : (
//           <span style={{ color: "#888" }}>No Website</span>
//         )}
//       </td>
//       <td className="app-notes">
//         <div className="notes-wrapper">
//           <button
//             className="view-notes-btn"
//             onClick={() => setActiveNoteHtml(app.notes)}
//           >
//             View
//           </button>
//           <div
//             className="notes-preview"
//             dangerouslySetInnerHTML={{ __html: app.notes }}
//           />
//         </div>
//       </td>
//       {user?.role === "admin" && (
//         <td>
//           {app.userId?.name}
//           <br />
//           <small>{app.userId?.email}</small>
//         </td>
//       )}
//       <td>
//         <button onClick={() => handleEdit(app)}>Edit</button>
//         <button onClick={() => confirmDelete(app._id)}>Delete</button>
//       </td>
//     </tr>
//   ))}
// </tbody>
//       </table>

//       {/** Cards for Mobile */}
//       <div className="applications-cards">
//   {filteredApplications.map((app, index) => (
//     <div key={app._id} className="application-card">
//       <div className="card-index">#{index + 1}</div> {/* ✅ Add index here */}
//       <h3>{app.companyName}</h3>

//             <p>
//               <strong>Position:</strong> {app.positionTitle}
//             </p>
//             <p>
//               <strong>Date Applied:</strong>{" "}
//               {new Date(app.dateApplied).toLocaleDateString()}
//             </p>
//             <p>
//               <strong>Status:</strong> {app.status}
//             </p>
//             <p>
//               <strong>Website:</strong>{" "}
//               {app.website ? (
//              <a
//   href={
//     app.website.startsWith("http")
//       ? app.website
//       : `https://${app.website}`
//   }
//   target="_blank"
//   rel="noopener noreferrer"
// >
//   {app.website.length > 40 ? app.website.slice(0, 40) + "..." : app.website}
// </a>

//               ) : (
//                 <span style={{ color: "#888" }}>No Website</span>
//               )}
//             </p>
// <div className="application-card-section">
//   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//     <strong>Notes:</strong>
//     <button
//       className="view-notes-btn"
//       onClick={() => setActiveNoteHtml(app.notes)}
//     >
//       View
//     </button>
//   </div>
//   <div
//     className="application-card-notes"
//     dangerouslySetInnerHTML={{ __html: app.notes }}
//   />
// </div>


//             <div className="card-buttons">
//               <button onClick={() => handleEdit(app)}>Edit</button>
//               <button onClick={() => confirmDelete(app._id)}>Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Applications;

import { useEffect, useState } from "react";
import "./Applications.css";
import { useContext } from "react";
import { useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config/config";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

function Applications() {
  const { user } = useContext(AuthContext);
  const [applicants, setApplicants] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Frontend Developer",
    experience: "",
    resumeLink: "",
    status: "Applied",
    notes: "",
    linkedinProfile: "",
    userId: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [applicantToDelete, setApplicantToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const formRef = useRef(null);

  // Available roles
  const availableRoles = [
    "Frontend Developer",
    "Backend Engineer", 
    "Full Stack Developer",
    "Data Scientist",
    "DevOps Engineer",
    "UI/UX Designer",
    "Product Manager",
    "QA Engineer",
    "Mobile Developer",
    "Cloud Engineer"
  ];

  useEffect(() => {
    // For now, using dummy data - replace with API call later
    const dummyApplicants = [
      {
        _id: 1,
        name: "John Smith",
        email: "john.smith@email.com",
        phone: "+1-234-567-8901",
        role: "Frontend Developer",
        experience: "3 years",
        resumeLink: "https://drive.google.com/file/d/1234567890",
        status: "Applied",
        notes: "Strong React and JavaScript skills. Previous experience at startup.",
        linkedinProfile: "https://linkedin.com/in/johnsmith",
        dateApplied: new Date("2024-08-15"),
      },
      {
        _id: 2,
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        phone: "+1-234-567-8902",
        role: "Backend Engineer",
        experience: "5 years",
        resumeLink: "https://dropbox.com/resume-sarah.pdf",
        status: "Interview",
        notes: "Excellent Python and Django experience. Great communication skills.",
        linkedinProfile: "https://linkedin.com/in/sarahjohnson",
        dateApplied: new Date("2024-08-10"),
      },
      {
        _id: 3,
        name: "Mike Chen",
        email: "mike.chen@email.com",
        phone: "+1-234-567-8903",
        role: "Data Scientist",
        experience: "4 years",
        resumeLink: "https://onedrive.com/mike-resume",
        status: "Applied",
        notes: "PhD in Statistics. Machine Learning expertise with Python and R.",
        linkedinProfile: "https://linkedin.com/in/mikechen",
        dateApplied: new Date("2024-08-12"),
      },
      {
        _id: 4,
        name: "Emily Davis",
        email: "emily.davis@email.com",
        phone: "+1-234-567-8904",
        role: "UI/UX Designer",
        experience: "6 years",
        resumeLink: "https://behance.net/emilydavis",
        status: "Offer",
        notes: "Outstanding portfolio. Experience with Figma, Adobe Creative Suite.",
        linkedinProfile: "https://linkedin.com/in/emilydavis",
        dateApplied: new Date("2024-08-05"),
      },
      {
        _id: 5,
        name: "Alex Rodriguez",
        email: "alex.r@email.com",
        phone: "+1-234-567-8905",
        role: "DevOps Engineer",
        experience: "7 years",
        resumeLink: "https://github.com/alexr/resume",
        status: "Rejected",
        notes: "Strong AWS and Kubernetes skills but salary expectations too high.",
        linkedinProfile: "https://linkedin.com/in/alexrodriguez",
        dateApplied: new Date("2024-08-08"),
      },
    ];
    
    setApplicants(dummyApplicants);

    // Set userId for logged-in user if not admin
    if (user?.role !== "admin") {
      setFormData((prev) => ({ ...prev, userId: user?._id }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editMode) {
      // Update existing applicant
      setApplicants(
        applicants.map((applicant) =>
          applicant._id === editId 
            ? { ...applicant, ...formData, _id: editId }
            : applicant
        )
      );
      setEditMode(false);
      setEditId(null);
    } else {
      // Add new applicant
      const newApplicant = {
        ...formData,
        _id: Date.now(), // Simple ID for demo
        dateApplied: new Date(),
      };
      setApplicants([...applicants, newApplicant]);
    }

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "Frontend Developer",
      experience: "",
      resumeLink: "",
      status: "Applied",
      notes: "",
      linkedinProfile: "",
      userId: user?.role === "admin" ? "" : user?._id,
    });
  };

  const confirmDelete = (id) => {
    setApplicantToDelete(id);
    setShowConfirm(true);
  };

  const handleDeleteConfirmed = () => {
    setApplicants(applicants.filter((applicant) => applicant._id !== applicantToDelete));
    setApplicantToDelete(null);
    setShowConfirm(false);
  };

  const handleEdit = (applicant) => {
    setEditMode(true);
    setEditId(applicant._id);
    setFormData({
      name: applicant.name,
      email: applicant.email,
      phone: applicant.phone,
      role: applicant.role,
      experience: applicant.experience,
      resumeLink: applicant.resumeLink,
      status: applicant.status,
      notes: applicant.notes,
      linkedinProfile: applicant.linkedinProfile,
      userId: applicant.userId || "",
    });

    // Scroll to form
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // Filter applicants
  const filteredApplicants = applicants.filter((applicant) => {
    const matchesSearch = applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         applicant.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "" || applicant.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="applications-container">
      {showConfirm && (
        <ConfirmModal
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      
      <h1>Applicant Management</h1>

      {/* Form */}
      <form ref={formRef} onSubmit={handleSubmit} className="application-form">
        <div className="form-row">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
          <select name="role" value={formData.role} onChange={handleChange}>
            {availableRoles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <input
            type="text"
            name="experience"
            placeholder="Experience (e.g., 3 years)"
            value={formData.experience}
            onChange={handleChange}
            required
          />
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="form-row">
          <input
            type="url"
            name="resumeLink"
            placeholder="Resume Link (Google Drive, Dropbox, etc.)"
            value={formData.resumeLink}
            onChange={handleChange}
          />
          <input
            type="url"
            name="linkedinProfile"
            placeholder="LinkedIn Profile URL"
            value={formData.linkedinProfile}
            onChange={handleChange}
          />
        </div>

        <div className="form-row full-width">
          <textarea
            name="notes"
            placeholder="Additional notes about the applicant..."
            value={formData.notes}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <button type="submit" className="submit-btn">
          {editMode ? "Update Applicant" : "Add Applicant"}
        </button>
      </form>

      {/* Filters */}
      <div className="filters-section">
        <input
          type="text"
          placeholder="Search by name, email, or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="role-filter"
        >
          <option value="">All Roles</option>
          {availableRoles.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <div className="stats-section">
        <div className="stat-card">
          <h3>{filteredApplicants.length}</h3>
          <p>Total Applicants</p>
        </div>
        <div className="stat-card">
          <h3>{filteredApplicants.filter(a => a.status === "Applied").length}</h3>
          <p>Applied</p>
        </div>
        <div className="stat-card">
          <h3>{filteredApplicants.filter(a => a.status === "Interview").length}</h3>
          <p>Interview</p>
        </div>
        <div className="stat-card">
          <h3>{filteredApplicants.filter(a => a.status === "Offer").length}</h3>
          <p>Offer</p>
        </div>
      </div>

      {/* Table */}
      <table className="applications-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Experience</th>
            <th>Status</th>
            <th>Resume</th>
            <th>LinkedIn</th>
            <th>Date Applied</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplicants.map((applicant, index) => (
            <tr key={applicant._id}>
              <td>{index + 1}</td>
              <td className="applicant-name">{applicant.name}</td>
              <td className="applicant-email">
                <a href={`mailto:${applicant.email}`}>{applicant.email}</a>
              </td>
              <td className="applicant-role">{applicant.role}</td>
              <td className="applicant-experience">{applicant.experience}</td>
              <td>
                <span className={`status-tag ${applicant.status.toLowerCase()}`}>
                  {applicant.status}
                </span>
              </td>
              <td className="applicant-resume">
                {applicant.resumeLink ? (
                  <a
                    href={applicant.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resume-link"
                  >
                    View Resume
                  </a>
                ) : (
                  <span className="no-data">No Resume</span>
                )}
              </td>
              <td className="applicant-linkedin">
                {applicant.linkedinProfile ? (
                  <a
                    href={applicant.linkedinProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin-link"
                  >
                    LinkedIn
                  </a>
                ) : (
                  <span className="no-data">No Profile</span>
                )}
              </td>
              <td className="applicant-date">
                {applicant.dateApplied
                  ? new Date(applicant.dateApplied).toLocaleDateString()
                  : "N/A"}
              </td>
              <td className="actions-cell">
                <button onClick={() => handleEdit(applicant)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => confirmDelete(applicant._id)} className="delete-btn">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Cards */}
      <div className="applications-cards">
        {filteredApplicants.map((applicant, index) => (
          <div key={applicant._id} className="application-card">
            <div className="card-index">#{index + 1}</div>
            <h3>{applicant.name}</h3>
            <div className="card-details">
              <p><strong>Email:</strong> <a href={`mailto:${applicant.email}`}>{applicant.email}</a></p>
              <p><strong>Phone:</strong> {applicant.phone || "Not provided"}</p>
              <p><strong>Role:</strong> <span className="role-badge">{applicant.role}</span></p>
              <p><strong>Experience:</strong> {applicant.experience}</p>
              <p><strong>Status:</strong> <span className={`status-tag ${applicant.status.toLowerCase()}`}>{applicant.status}</span></p>
              <p><strong>Date Applied:</strong> {new Date(applicant.dateApplied).toLocaleDateString()}</p>
              
              <div className="card-links">
                {applicant.resumeLink && (
                  <a href={applicant.resumeLink} target="_blank" rel="noopener noreferrer" className="card-link">
                    📄 Resume
                  </a>
                )}
                {applicant.linkedinProfile && (
                  <a href={applicant.linkedinProfile} target="_blank" rel="noopener noreferrer" className="card-link">
                    💼 LinkedIn
                  </a>
                )}
              </div>

              {applicant.notes && (
                <div className="card-notes">
                  <strong>Notes:</strong>
                  <p>{applicant.notes}</p>
                </div>
              )}
            </div>

            <div className="card-buttons">
              <button onClick={() => handleEdit(applicant)} className="edit-btn">Edit</button>
              <button onClick={() => confirmDelete(applicant._id)} className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Applications;
