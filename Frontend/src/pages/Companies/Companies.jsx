// import { useEffect, useState } from "react";
// import "./Companies.css";
// import { API_BASE_URL } from "../../config/config";
// import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

// function Companies() {
//   const [companies, setCompanies] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     industry: "",
//     location: "",
//     website: "",
//   });
//   const [editMode, setEditMode] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [companyToDelete, setCompanyToDelete] = useState(null);

//   useEffect(() => {
//     fetch(`${API_BASE_URL}/companies`)
//       .then((response) => response.json())
//       .then((data) => setCompanies(data))
//       .catch((err) => console.error("Error fetching companies:", err));
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const method = editMode ? "PATCH" : "POST";
//     const url = editMode
//       ? `${API_BASE_URL}/companies/${editId}`
//       : `${API_BASE_URL}/companies`;

//     fetch(url, {
//       method: method,
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         if (editMode) {
//           setCompanies(
//             companies.map((comp) => (comp._id === editId ? result : comp))
//           );
//           setEditMode(false);
//           setEditId(null);
//         } else {
//           setCompanies([...companies, result]);
//         }
//         setFormData({ name: "", industry: "", location: "", website: "" });
//       })
//       .catch((err) => console.error("Error submitting company:", err));
//   };


//   const handleEdit = (comp) => {
//     setEditMode(true);
//     setEditId(comp._id);
//     setFormData({
//       name: comp.name,
//       industry: comp.industry,
//       location: comp.location,
//       website: comp.website,
//     });
//   };

//   const confirmDelete = (id) => {
//     setCompanyToDelete(id);
//     setShowConfirm(true);
//   };

// const handleDeleteConfirmed = () => {
//   console.log("DELETE confirmed for:", companyToDelete);
//   fetch(`${API_BASE_URL}/companies/${companyToDelete}`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   })
//     .then(() => {
//       setCompanies(companies.filter((comp) => comp._id !== companyToDelete));
//       setCompanyToDelete(null);
//       setShowConfirm(false);
//     })
//     .catch((err) => {
//       console.error("Error deleting company:", err);
//       setShowConfirm(false);
//     });
// };


//   return (
//     <div className="companies-header">
//       {showConfirm && (
//   <ConfirmModal
//     onConfirm={handleDeleteConfirmed}
//     onCancel={() => setShowConfirm(false)}
//   />
// )}
//       <h1>Companies</h1>
//       <p>
//         Use this page to manage your list of companies. You can store employer
//         info like industry, location, and website — and use it to track who
//         you’re applying to or want to reach out to.
//       </p>

//       <form onSubmit={handleSubmit} className="company-form">
//         <input
//           type="text"
//           name="name"
//           placeholder="Company Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="industry"
//           placeholder="Industry"
//           value={formData.industry}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="location"
//           placeholder="Location"
//           value={formData.location}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="website"
//           placeholder="Website"
//           value={formData.website}
//           onChange={handleChange}
//         />
//         <button type="submit">
//           {editMode ? "Update Company" : "Add Company"}
//         </button>
//       </form>

//       <div className="company-list">
//         {companies.map((company) => (
//           <div key={company._id} className="company-item">
//             <strong>{company.name}</strong>
//             <br />
//             <span>
//               {company.industry} - {company.location}
//             </span>
//             <br />
//             <a href={company.website} target="_blank" rel="noopener noreferrer">
//               {company.website}
//             </a>
//             <br />
//             <button onClick={() => handleEdit(company)}>Edit</button>
//             <button onClick={() => confirmDelete(company._id)}>Delete</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Companies;

import { useEffect, useState } from "react";
import "./Companies.css";
import { API_BASE_URL } from "../../config/config";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

function Companies() {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    salary: "",
    description: "",
    requirements: "",
    experience: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/jobs`)
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = editMode ? "PATCH" : "POST";
    const url = editMode
      ? `${API_BASE_URL}/jobs/${editId}`
      : `${API_BASE_URL}/jobs`;

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (editMode) {
          setJobs(
            jobs.map((job) => (job._id === editId ? result : job))
          );
          setEditMode(false);
          setEditId(null);
        } else {
          setJobs([...jobs, result]);
        }
        setFormData({ 
          title: "", 
          company: "", 
          location: "", 
          type: "", 
          salary: "", 
          description: "", 
          requirements: "", 
          experience: "" 
        });
      })
      .catch((err) => console.error("Error submitting job:", err));
  };

  const handleEdit = (job) => {
    setEditMode(true);
    setEditId(job._id);
    setFormData({
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      salary: job.salary,
      description: job.description,
      requirements: job.requirements,
      experience: job.experience,
    });
  };

  const confirmDelete = (id) => {
    setJobToDelete(id);
    setShowConfirm(true);
  };

  const handleDeleteConfirmed = () => {
    console.log("DELETE confirmed for:", jobToDelete);
    fetch(`${API_BASE_URL}/jobs/${jobToDelete}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        setJobs(jobs.filter((job) => job._id !== jobToDelete));
        setJobToDelete(null);
        setShowConfirm(false);
      })
      .catch((err) => {
        console.error("Error deleting job:", err);
        setShowConfirm(false);
      });
  };

  return (
    <div className="companies-header">
      {showConfirm && (
        <ConfirmModal
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      <h1>Job Postings</h1>
      <p>
        Post and manage job opportunities for different roles. Add job details including 
        requirements, salary, and experience level to attract the right candidates.
      </p>

      <form onSubmit={handleSubmit} className="job-form">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="">Job Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
          <option value="Remote">Remote</option>
        </select>
        <input
          type="text"
          name="salary"
          placeholder="Salary Range"
          value={formData.salary}
          onChange={handleChange}
        />
        <input
          type="text"
          name="experience"
          placeholder="Experience Level (e.g., 2-5 years)"
          value={formData.experience}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
        />
        <textarea
          name="requirements"
          placeholder="Requirements & Qualifications"
          value={formData.requirements}
          onChange={handleChange}
          rows="3"
        />
        <button type="submit">
          {editMode ? "Update Job" : "Post Job"}
        </button>
      </form>

   
    </div>
  );
}

export default Companies;
