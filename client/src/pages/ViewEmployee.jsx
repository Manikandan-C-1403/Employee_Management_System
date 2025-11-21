import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

export default function ViewEmployee() {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);
  
  useEffect(() => {
    if (id)
      API.get(`/employees/${id}`)
        .then((res) => setEmp(res.data))
        .catch(() => { });
  }, [id]);

  const nav = useNavigate();

  if (!emp) return <div>Loading...</div>;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button className="btn btn-white p-0 m-0 fs-2" onClick={() => nav(-1)}>
          <i className="bi bi-chevron-left"></i>
        </button>
        <h3 className="m-0">View Employee Details</h3>
      </div>

      <div className="section-wrapper">
        <div className="section-header">
          <i className="bi bi-person-fill section-icon"></i>
          <span className="section-text">Personal Information</span>
        </div>

        <div className="section-lines">
          <div className="blue-line"></div>
          <div className="grey-line"></div>
        </div>
      </div>

      <div className="mt-4">
        <div className="">
          <img
            src={
              emp.profile_image
                ? `${emp.profile_image}`
                : "/IMG-20251117-WA0001.jpg"
            }
            width={100}
            height={100}
            className="rounded"
            alt=""
          />
          <br />
        </div>

        <div className="row mt-4">
          <div className="col-md-6">
            <strong style={{ color: "gray" }} className="fw-light">Name</strong>
            <div style={{ fontSize: "20px" }}>{emp.name}</div>
          </div>
          <div className="col-md-6 mt-2">
            <strong style={{ color: "gray" }} className="fw-light">Employee ID</strong>
            <div style={{ fontSize: "20px" }}>{emp.employee_id}</div>
          </div>
        </div>

        <hr />
        <div className="row">
          <div className="col-md-6">
            <strong style={{ color: "gray" }} className="fw-light">Department</strong>
            <div style={{ fontSize: "20px" }}>{emp.department}</div>
          </div>
          <div className="col-md-6">
            <strong style={{ color: "gray" }} className="fw-light">Designation</strong>
            <div style={{ fontSize: "20px" }}>{emp.designation}</div>
          </div>
        </div>
        <hr />

        <div className="row mt-3">
          <div className="col-md-6">
            <strong style={{ color: "gray" }} className="fw-light">Project</strong>
            <div style={{ fontSize: "20px" }}>{emp.project}</div>
          </div>
          <div className="col-md-6">
            <strong style={{ color: "gray" }} className="fw-light">Type</strong>
            <div style={{ fontSize: "20px" }}>{emp.type}</div>
          </div>
        </div>
        <hr />
        <div className="mt-3">
          <strong style={{ color: "gray" }} className="fw-light">Status</strong>
          <div style={{ fontSize: "20px" }}>{emp.status}</div>
        </div>
      </div>
    </div>
  );
}
