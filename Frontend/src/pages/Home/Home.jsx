// // import "./Home.css";
// // import { useContext } from "react";
// // import { AuthContext } from "../../context/AuthContext";
// // import { Link } from "react-router-dom";

// // function Home() {
// //   const { user } = useContext(AuthContext);

// //   return (
// //     <div className="home-container">
// //       <div className="home-content">
// //         <h1 className="hero-title">Welcome to Job Tracker</h1>
// //         <p className="hero-subtitle">
// //           Keep tabs on your job applications, company prospects, and career
// //           progress — all in one place.
// //         </p>

// //         {!user && (
// //           <div className="cta-wrapper">
// //             <p className="cta-message">Start tracking your job search today.</p>
// //             <Link to="/register" className="cta-button">
// //               Sign Up for Free
// //             </Link>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Home;




// import "./Home.css";
// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";

// function Home() {
//   const { user } = useContext(AuthContext);

//   // Dummy job data (replace with API/context later)
//   const jobs = [
//     { id: 1, title: "Frontend Developer", company: "Google", status: "Applied" },
//     { id: 2, title: "Backend Engineer", company: "Amazon", status: "In Process" },
//     { id: 3, title: "Data Analyst", company: "Netflix", status: "Rejected" },
//     { id: 4, title: "Full Stack Dev", company: "Microsoft", status: "Applied" },
//     { id: 5, title: "UI/UX Designer", company: "Adobe", status: "In Process" },
//     { id: 6, title: "Cloud Engineer", company: "IBM", status: "Rejected" },
//     { id: 7, title: "DevOps Engineer", company: "Spotify", status: "Applied" },
//     { id: 8, title: "Security Analyst", company: "Cisco", status: "In Process" },
//     { id: 9, title: "ML Engineer", company: "NVIDIA", status: "Rejected" },
//     { id: 10, title: "Software Intern", company: "Intel", status: "Applied" },
//     { id: 11, title: "Systems Engineer", company: "Dell", status: "In Process" },
//     { id: 12, title: "Game Developer", company: "Ubisoft", status: "Rejected" },
//   ];

//   // Group jobs by status
//   const jobGroups = {
//     Applied: jobs.filter((job) => job.status === "Applied"),
//     "In Process": jobs.filter((job) => job.status === "In Process"),
//     Rejected: jobs.filter((job) => job.status === "Rejected"),
//   };

//   return (
//     <div className="home-container">
//       {!user ? (
//         <div className="home-content">
//           <h1 className="hero-title">Welcome to Job Tracker</h1>
//           <p className="hero-subtitle">
//             Keep tabs on your job applications, company prospects, and career
//             progress — all in one place.
//           </p>
//           <div className="cta-wrapper">
//             <p className="cta-message">Start tracking your job search today.</p>
//             <a href="/register" className="cta-button">
//               Sign Up for Free
//             </a>
//           </div>
//         </div>
//       ) : (
//         <div className="kanban-board">
//           {Object.entries(jobGroups).map(([status, jobs]) => (
//             <div key={status} className="kanban-column">
//               <h2 className={`status-title ${status.replace(" ", "").toLowerCase()}`}>
//                 {status}
//               </h2>
//               {jobs.length === 0 ? (
//                 <p className="empty-msg">No jobs here</p>
//               ) : (
//                 jobs.map((job) => (
//                   <div
//                     key={job.id}
//                     className={`kanban-card ${job.status.replace(" ", "").toLowerCase()}`}
//                   >
//                     <h3>{job.title}</h3>
//                     <p>{job.company}</p>
//                   </div>
//                 ))
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Home;


import "./Home.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Home() {
  const { user } = useContext(AuthContext);

  // Dummy applicant data organized by roles
  const applicantsByRole = {
    "Frontend Developer": [
      { id: 1, name: "John Smith", email: "john@email.com", experience: "3 years", status: "Applied" },
      { id: 2, name: "Sarah Johnson", email: "sarah@email.com", experience: "5 years", status: "Interview" },
      { id: 3, name: "Mike Chen", email: "mike@email.com", experience: "2 years", status: "Applied" },
      { id: 4, name: "Lisa Brown", email: "lisa@email.com", experience: "4 years", status: "Offer" },
      { id: 5, name: "David Wilson", email: "david@email.com", experience: "1 year", status: "Rejected" },
    ],
    "Backend Engineer": [
      { id: 6, name: "Emma Davis", email: "emma@email.com", experience: "4 years", status: "Applied" },
      { id: 7, name: "Alex Rodriguez", email: "alex@email.com", experience: "6 years", status: "Interview" },
      { id: 8, name: "Tom Anderson", email: "tom@email.com", experience: "3 years", status: "Applied" },
      { id: 9, name: "Rachel Green", email: "rachel@email.com", experience: "5 years", status: "Offer" },
    ],
    "Data Scientist": [
      { id: 10, name: "Kevin Lee", email: "kevin@email.com", experience: "2 years", status: "Applied" },
      { id: 11, name: "Amy Zhang", email: "amy@email.com", experience: "4 years", status: "Interview" },
      { id: 12, name: "Chris Taylor", email: "chris@email.com", experience: "3 years", status: "Rejected" },
    ],
    "DevOps Engineer": [
      { id: 13, name: "Sam Parker", email: "sam@email.com", experience: "5 years", status: "Applied" },
      { id: 14, name: "Maya Patel", email: "maya@email.com", experience: "7 years", status: "Interview" },
      { id: 15, name: "Jake Miller", email: "jake@email.com", experience: "2 years", status: "Applied" },
      { id: 16, name: "Nina Foster", email: "nina@email.com", experience: "4 years", status: "Offer" },
    ]
  };

  // Flatten all applicants and group by status
  const allApplicants = Object.values(applicantsByRole).flat();
  const applicantGroups = {
    Applied: allApplicants.filter((applicant) => applicant.status === "Applied"),
    Interview: allApplicants.filter((applicant) => applicant.status === "Interview"),
    Offer: allApplicants.filter((applicant) => applicant.status === "Offer"),
    Rejected: allApplicants.filter((applicant) => applicant.status === "Rejected"),
  };

  // Prepare data for bar chart
  const chartData = Object.keys(applicantsByRole).map(role => ({
    role: role,
    applicants: applicantsByRole[role].length,
    applied: applicantsByRole[role].filter(a => a.status === "Applied").length,
    interview: applicantsByRole[role].filter(a => a.status === "Interview").length,
    offer: applicantsByRole[role].filter(a => a.status === "Offer").length,
    rejected: applicantsByRole[role].filter(a => a.status === "Rejected").length,
  }));

  // Get role for an applicant
  const getApplicantRole = (applicantId) => {
    for (const [role, applicants] of Object.entries(applicantsByRole)) {
      if (applicants.find(a => a.id === applicantId)) {
        return role;
      }
    }
    return "Unknown Role";
  };

  return (
    <div className="home-container">
      {!user ? (
        <div className="home-content">
          <h1 className="hero-title">Welcome to Recruiter Dashboard</h1>
          <p className="hero-subtitle">
            Manage your recruitment pipeline, track candidates across different roles, 
            and streamline your hiring process — all in one place.
          </p>
          <div className="cta-wrapper">
            <p className="cta-message">Start managing your recruitment today.</p>
            <a href="/register" className="cta-button">
              Sign Up for Free
            </a>
          </div>
        </div>
      ) : (
        <div className="dashboard-wrapper">
          {/* Kanban Board */}
          <div className="kanban-board">
            {Object.entries(applicantGroups).map(([status, applicants]) => (
              <div key={status} className="kanban-column">
                <h2 className={`status-title ${status.toLowerCase()}`}>
                  {status} ({applicants.length})
                </h2>
                <div className="applicants-scroll">
                  {applicants.length === 0 ? (
                    <p className="empty-msg">No applicants here</p>
                  ) : (
                    applicants.map((applicant) => (
                      <div
                        key={applicant.id}
                        className={`kanban-card ${applicant.status.toLowerCase()}`}
                      >
                        <h3>{applicant.name}</h3>
                        <p className="applicant-email">{applicant.email}</p>
                        <p className="applicant-role">{getApplicantRole(applicant.id)}</p>
                        <p className="applicant-experience">{applicant.experience} experience</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bar Chart Section */}
          <div className="chart-section">
            <h2 className="chart-title">Applicants by Role</h2>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                  <XAxis 
                    dataKey="role" 
                    stroke="#ccc" 
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="#ccc" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#2a2a2a', 
                      border: '1px solid #555',
                      borderRadius: '8px',
                      color: '#fff'
                    }} 
                  />
                  <Bar dataKey="applicants" fill="#00bfff" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;