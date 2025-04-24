// import React, { useEffect,useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import DropdownField from '../Components/DropdownField'; // Assuming DropdownField is a custom component
// import Header from '../Components/Header';
 


// const ProjectDetails = () => {
//   const [projects, setProjects] = useState([]);
//   const [filteredProjects, setFilteredProjects] = useState([]); // Filtered projects to display
//   const [selectedProject, setSelectedProject] = useState("");
//   const [selectedLocation, setSelectedLocation] = useState("");
  
//   const navigate = useNavigate();
//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const queryParams = [];
//         if (selectedProject) queryParams.push(`projectName=${encodeURIComponent(selectedProject)}`);
//         if (selectedLocation) queryParams.push(`city=${encodeURIComponent(selectedLocation)}`);
//         const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
  
//         const response = await fetch(`http://localhost:8080/api/searchByNameAndCity${queryString}`);
//         const data = await response.json();
//         setProjects(data);
//         setFilteredProjects(data);
//       } catch (error) {
//         console.error('Error fetching project data:', error);
//       }
//     };
  
//     fetchProjects();
//   }, [selectedProject, selectedLocation]);
//    // Re-fetch when filters change
  
//   // Filtering logic inside the render method
//   // const filteredProjects = projects.filter(
//   //   (p) =>
//   //     (selectedProject ? p.projectName === selectedProject : true) &&
//   //     (selectedLocation ? p.city === selectedLocation : true)
//   // );
 
//   // Custom wrapper for DropdownField onChange
//   const handleDropdownChange = (section, field, value) => {
//     if (field === "project") setSelectedProject(value);
//     if (field === "location") setSelectedLocation(value);
//   };
//   const calculateDaysSince = (createdDate) => {
//     if (!createdDate) return "N/A";
//     const created = new Date(createdDate);
//     const today = new Date();
//     const diffTime = Math.abs(today - created);
//     const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
//     return `${days} Days`;
//   };
  
 
//   return (
//     <div className="bg-black text-white px-4 sm:px-6 lg:px-14">
//          <header className="bg-black text-white p-4 sm:mx-8 md:mx-10 xl:mx-24">
//                 <Header />
//               </header>
//               <div className="bg-black text-white p-6 sm:p-10 lg:p-8">
//       <h2 className="text-xl md:text-2xl font-semibold text-white mt-4">All Project Details</h2>
 
//       {/* Filters */}
//       <div className="flex flex-col md:flex-row w-full md:w-1/2 space-y-4 md:space-y-0 md:space-x-4 my-4">
//         <DropdownField
//           label="Select Project"
//           section="filters"
//           field="project"
//           value={selectedProject}
//           onChange={handleDropdownChange}
//           // options={[
//           //   ...new Set(
//           //     projects.map((p) => ({
//           //       label: p.projectName,
//           //       value: p.projectName,
//           //     }))
//           //   ),
//           // ]}
//           options={Array.from(
//             new Set(projects.map((p) => p.projectName))
//           ).map((name) => ({
//             label: name,
//             value: name,
//           }))}
//         />
 
//         <DropdownField
//           label="Select Location"
//           section="filters"
//           field="location"
//           value={selectedLocation}
//           onChange={handleDropdownChange}
//           // options={[
//           //   ...new Set(
//           //     projects.map((p) => ({
//           //       label: p.city,
//           //       value: p.city,
//           //     }))
//           //   ),
//           // ]}
//           options={Array.from(
//             new Set(projects.map((p) => p.city))
//           ).map((city) => ({
//             label: city,
//             value: city,
//           }))}
//         />
//       </div>
 
//       {/* Desktop Table - Hidden on Mobile */}
//       <div className="hidden md:block overflow-x-auto md:p-8">
//         <table className="w-full text-left border-separate border-spacing-2">
//           <thead>
//           <tr className="text-white font-bold text-lg">
//               <th>Organisation</th>
//               <th>Project</th>
//               <th>Location</th>
//               <th>Date of Creation</th>
//               <th>Age of Listing</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProjects.length > 0 ? (
//               filteredProjects.map((p) => (
//                 <tr key={p.projectId || `${p.projectName}-${p.city}` } className="border-b border-gray-600">
//                   <td>{p.orgName}</td>
//                   <td>{p.projectName}</td>
//                   <td>{p.city}</td>
//                   <td>{p.createdAt}</td>
//                   <td>{calculateDaysSince(p.createdAt)}</td>
//                   <td>
//                 <button
//                   className="text-blue-400 underline"
//                   onClick={() =>
//                     navigate(`/all-update/${p.projectId}`, { state: { projectData: p } })
//                   }
//                 >
//                   Edit
//                 </button>
//               </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center text-gray-400">
//                   No projects match your filters.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
 
//       {/* Mobile View for Table - Visible on Mobile */}
//       <div className="md:hidden">
//         {filteredProjects.length > 0 ? (
//           filteredProjects.map((p) => (
//             <div key={p.projectId} className="border-b border-gray-600 p-4">
//             <div><strong>Organisation:</strong> {p.organisation}</div>
//             <div><strong>Project:</strong> {p.project}</div>
//             <div><strong>Location:</strong> {p.location}</div>
//             <div><strong>Date of Creation:</strong> {p.createdAt}</div>
//             <div><strong>Age of Listing:</strong> {calculateDaysSince(p.createdAt)}</div>
//             <button
//               className="text-blue-400 underline"
//               onClick={() => navigate(`/all-update/${p.projectId}`)}
//             >
//               Edit
//             </button>
//           </div>
//         ))
//       ) : (
//         <div className="text-center text-gray-400">
//           No projects match your filters.
//         </div>
//       )}
//     </div></div>
//   </div>
// );
// };
 
// export default ProjectDetails;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DropdownField from '../Components/DropdownField'; // Assuming DropdownField is a custom component
import Header from '../Components/Header';

const ProjectDetails = () => {
  const [projects, setProjects] = useState([]); // All projects fetched from the API
  const [filteredProjects, setFilteredProjects] = useState([]); // Projects to display based on filters
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const navigate = useNavigate();

  // Fetch all projects once when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`http://localhost:8080/admin/searchByNameAndCity`);
        const data = await response.json();
        setProjects(data);
        setFilteredProjects(data); // Initially, display all projects
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchProjects();
  }, []);

  // Update filtered projects based on selected filters
  useEffect(() => {
    const newFilteredProjects = projects.filter(
      (p) =>
        (selectedProject ? p.projectName === selectedProject : true) &&
        (selectedLocation ? p.city === selectedLocation : true)
    );
    setFilteredProjects(newFilteredProjects);
  }, [selectedProject, selectedLocation, projects]);

  // Custom wrapper for DropdownField onChange
  const handleDropdownChange = (section, field, value) => {
    if (field === "project") setSelectedProject(value);
    if (field === "location") setSelectedLocation(value);
  };

  const calculateDaysSince = (createdDate) => {
    if (!createdDate) return "N/A";
    const created = new Date(createdDate);
    const today = new Date();
    const diffTime = Math.abs(today - created);
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return `${days} Days`;
  };

  return (
    <div className="bg-black text-white px-4 sm:px-6 lg:px-14">
      <header className="bg-black text-white p-4 sm:mx-8 md:mx-10 xl:mx-24">
        <Header />
      </header>
      <div className="bg-black text-white p-6 sm:p-10 lg:p-8">
        <h2 className="text-xl md:text-2xl font-semibold text-white mt-4">All Project Details</h2>

        {/* Filters */}
        <div className="flex flex-col md:flex-row w-full md:w-1/2 space-y-4 md:space-y-0 md:space-x-4 my-4">
          <DropdownField
            label="Select Project"
            section="filters"
            field="project"
            value={selectedProject}
            onChange={handleDropdownChange}
            options={Array.from(
              new Set(projects.map((p) => p.projectName))
            ).map((name) => ({
              label: name,
              value: name,
            }))}
          />

          <DropdownField
            label="Select Location"
            section="filters"
            field="location"
            value={selectedLocation}
            onChange={handleDropdownChange}
            options={Array.from(
              new Set(projects.map((p) => p.city))
            ).map((city) => ({
              label: city,
              value: city,
            }))}
          />
        </div>

        {/* Desktop Table - Hidden on Mobile */}
        <div className="hidden md:block overflow-x-auto md:p-8">
          <table className="w-full text-left border-separate border-spacing-2">
            <thead>
              <tr className="text-white font-bold text-lg ">
                <th>Organisation</th>
                <th>Project</th>
                <th>Location</th>
                <th>Date of Creation</th>
                <th>Age of Listing</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((p) => (
                  <tr key={p.projectId || `${p.projectName}-${p.city}`} className="border-b border-gray-600">
                    <td>{p.orgName}</td>
                    <td>{p.projectName}</td>
                    <td>{p.city}</td>
                    <td>{p.createdAt}</td>
                    <td>{calculateDaysSince(p.createdAt)}</td>
                    <td>
                      <button
                        className="text-blue-400 underline"
                        onClick={() =>
                          navigate(`/all-update/${p.projectId}`, { state: { projectData: p } })
                        }
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                    <button
                        className="text-blue-400 underline"
                        onClick={() => {
                            console.log("Navigating to project:", p.projectId);
                            navigate(`/property-details/${p.projectId}`);
                          }}
                      >
                        view
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-gray-400">
                    No projects match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View for Table - Visible on Mobile */}
        <div className="md:hidden">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((p) => (
              <div key={p.projectId} className="border-b border-gray-600 p-4">
                <div><strong>Organisation:</strong> {p.orgName}</div>
                <div><strong>Project:</strong> {p.projectName}</div>
                <div><strong>Location:</strong> {p.city}</div>
                <div><strong>Date of Creation:</strong> {p.createdAt}</div>
                <div><strong>Age of Listing:</strong> {calculateDaysSince(p.createdAt)}</div>
                <button
                  className="text-blue-400 underline"
                  onClick={() => navigate(`/all-update/${p.projectId}`)}
                >
                  Edit
                </button>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400">
              No projects match your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;