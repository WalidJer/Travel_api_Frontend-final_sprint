// import React, { useEffect, useState } from "react";
// import { listAirlines, createAirline } from "../services/airlineService";
// import BackButton from "../components/BackButton";
// import BackButtonAdmin from "../components/BackButtonAdmin";


// const AirlineAdminPage = () => {
//   const [airlines, setAirlines] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     code: ""
//   });

//   useEffect(() => {
//     listAirlines().then(res => setAirlines(res.data));
//   }, []);

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     createAirline(formData).then(res => {
//       setAirlines(prev => [...prev, res.data]);
//       setFormData({ name: "", code: "" });
//     });
//   };

//   return (
//     <div className="admin-container">
//       <h2 className="admin-title">🛫 Manage Airlines</h2>

//       <form onSubmit={handleSubmit} className="flight-form">
//         <input name="name" placeholder="Airline Name" value={formData.name} onChange={handleChange} required />
//         <input name="code" placeholder="Airline Code (e.g., AC)" value={formData.code} onChange={handleChange} required />
//         <button type="submit">+ Add Airline</button>
//       </form>

//       <table className="flight-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Code</th>
//           </tr>
//         </thead>
//         <tbody>
//           {airlines.map(a => (
//             <tr key={a.id}>
//               <td>{a.name}</td>
//               <td>{a.code}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <BackButton style={{ marginTop: "50px"}} />
//       <BackButtonAdmin />
//     </div>
//   );
// };

// export default AirlineAdminPage;

import React, { useEffect, useState } from "react";
import { listAirlines, createAirline } from "../services/airlineService";
import BackButton from "../components/BackButton";
import BackButtonAdmin from "../components/BackButtonAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const AirlineAdminPage = () => {
  const [airlines, setAirlines] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    code: ""
  });

  useEffect(() => {
    listAirlines().then(res => setAirlines(res.data));
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createAirline(formData).then(res => {
      setAirlines(prev => [...prev, res.data]);
      setFormData({ name: "", code: "" });
    });
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">
        <FontAwesomeIcon icon={faPlane} style={{ marginRight: "10px" }} />
        Manage Airlines
      </h2>

      <form onSubmit={handleSubmit} className="airline-form">
        <input
          name="name"
          placeholder="Airline Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="code"
          placeholder="Airline Code (e.g., AC)"
          value={formData.code}
          onChange={handleChange}
          required
        />
        <button type="submit">
          <FontAwesomeIcon icon={faPlusCircle} style={{ marginRight: "6px" }} />
          Add Airline
        </button>
      </form>

      <table className="airline-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
          </tr>
        </thead>
        <tbody>
          {airlines.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.code}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "50px" }}>
        <BackButton />
        <BackButtonAdmin />
      </div>
    </div>
  );
};

export default AirlineAdminPage;