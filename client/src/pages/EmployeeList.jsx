import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import DeleteModal from "./DeleteModal";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [q, setQ] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const navigate = useNavigate();

   
  useEffect(() => {
    fetchList();
  }, []);

  function fetchList() {
    API.get("/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  }

   
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

   
  const confirmDelete = () => {
    API.delete(`/employees/${deleteId}`)
      .then(() => {
        fetchList();
        setShowModal(false);
      })
      .catch((err) => console.error(err));
  };

   
  const filtered = employees.filter((emp) =>
    Object.values(emp)
      .join(" ")
      .toLowerCase()
      .includes(q.toLowerCase())
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Employee</h3>

        <div className="d-flex gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="form-control lh-sm"
            placeholder="Search"
            style={{ width: 260 , padding: "8px 20px", height: "42px"}}
          />
          <Link to="/add" className="btn btn-primary" style={{ padding: "0.5rem 1rem 0 1rem" }}>
            <i className="bi bi-plus-circle pe-2"></i> Add New Employee
          </Link>
        </div>
      </div>

      <div className="card p-3">
        <table className="table mb-0">
          <thead>
            <tr className="pb-2">
              <th>Employee Name</th>
              <th>Employee ID</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Project</th>
              <th>Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-5">
                  No records found
                </td>
              </tr>
            ) : (
              filtered.map((emp) => (
                
                <tr key={emp.id} className="border-top align-middle border-bottom-none border-style-none">
                  <td>
                    <img
                      src={
                        emp.profile_image
                          ? emp.profile_image
                          : "/IMG-20251117-WA0001.jpg"
                      }
                      width={35}
                      height={35}
                      className="rounded-circle me-2"
                      alt=""
                    />
                    {emp.name}
                  </td>

                  <td>{emp.employee_id}</td>
                  <td>{emp.department}</td>
                  <td>{emp.designation}</td>
                  <td>{emp.project}</td>
                  <td>{emp.type}</td>
                  <td>{emp.status}</td>

                  <td className="action-buttons">
                    <button
                      className="tbl-btn view"
                      onClick={() => navigate(`/view/${emp.id}`)}
                    >
                      <FiEye size={18} />
                    </button>

                    <button
                      className="tbl-btn edit"
                      onClick={() => navigate(`/edit/${emp.id}`)}
                    >
                      <FiEdit2 size={18} />
                    </button>

                    <button
                      className="tbl-btn delete"
                      onClick={() => handleDeleteClick(emp.id)}
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

       
      {showModal && (
        <DeleteModal
          onCancel={() => setShowModal(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
