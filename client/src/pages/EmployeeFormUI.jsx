import React, { useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";

export default function EmployeeFormUI({
  title,
  form,
  handleChange,
  submit,
  navigate,
  preview,
  handleImage,
  idError, 
  id, 
}) {
  
  const [, setForceUpdate] = useState(false);

  
  const validator = useRef(
    new SimpleReactValidator({
      
      messages: {
        required: "This field is required",
        min: "Too short",
        numeric: "Only numbers allowed",
      },
    })
  );

  
  const handleLocalSubmit = (e) => {
    e.preventDefault();

    
    if (!validator.current.allValid()) {
      validator.current.showMessages();
      setForceUpdate((v) => !v);
      return;
    }

    
    if (idError) {
      alert("Employee ID already exists. Please use another ID.");
      return;
    }

    
    submit(e);
  };

  return (
    <div>
      
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          className="btn btn-white p-0 m-0 fs-2"
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-chevron-left" />
        </button>
        <h3 className="m-0">{title}</h3>
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

      
      <form onSubmit={handleLocalSubmit} className="mt-4" noValidate>
        
        <div className="mb-3">
          <div
            className="profile-upload-container"
            style={{ position: "relative" }}
          >
            {preview ? (
              <>
                <img src={preview} alt="profile" className="profile-preview" />
                <button
                  type="button"
                  className="edit-btn"
                  onClick={() =>
                    document.getElementById("profileInput").click()
                  }
                >
                  ✎
                </button>
              </>
            ) : (
              <div
                className="empty-box"
                onClick={() => document.getElementById("profileInput").click()}
              >
                <span className="camera-icon">📷</span>
              </div>
            )}

            <input
              id="profileInput"
              type="file"
              accept="image/*"
              onChange={handleImage}
              style={{ display: "none" }}
            />
          </div>
        </div>

        
        <div className="row">
          
          <div className="col-md-6">
            <label className="form-label fw-bold">Name*</label>
            <input
              name="name"
              value={form.name || ""}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter name"
            />
            <div style={{ color: "red", fontSize: 13 }}>
              {validator.current.message("name", form.name, "required|min:3")}
            </div>
          </div>

          
          <div className="col-md-6">
            <label className="form-label fw-bold">Employee ID*</label>
            <input
              name="employee_id"
              value={form.employee_id || ""}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter employee ID"
            />

            
            {idError && (
              <small style={{ color: "red", fontSize: 14 }}>{idError}</small>
            )}

            
            <div style={{ color: "red", fontSize: 13 }}>
              {validator.current.message(
                "employee_id",
                form.employee_id,
                "required|numeric"
              )}
            </div>
          </div>
        </div>

        <div className="row mt-3">
          
          <div className="col-md-6">
            <label className="form-label fw-bold">Department*</label>
            <select
              name="department"
              value={form.department || ""}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select Department</option>
              <option>Design</option>
              <option>Engineering</option>
              <option>HR</option>
            </select>
            <div style={{ color: "red", fontSize: 13 }}>
              {validator.current.message(
                "department",
                form.department,
                "required"
              )}
            </div>
          </div>

          
          <div className="col-md-6">
            <label className="form-label fw-bold">Designation*</label>
            <select
              name="designation"
              value={form.designation || ""}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select designation</option>
              <option>Design Lead</option>
              <option>Developer</option>
            </select>
            <div style={{ color: "red", fontSize: 13 }}>
              {validator.current.message(
                "designation",
                form.designation,
                "required"
              )}
            </div>
          </div>
        </div>

        <div className="row mt-3">
          
          <div className="col-md-6">
            <label className="form-label fw-bold">Project</label>
            <input
              name="project"
              value={form.project || ""}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Project"
            />
          </div>

          
          <div className="col-md-6">
            <label className="form-label fw-bold">Type*</label>
            <select
              name="type"
              value={form.type || ""}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select Type</option>
              <option>Office</option>
              <option>Remote</option>
            </select>
            <div style={{ color: "red", fontSize: 13 }}>
              {validator.current.message("type", form.type, "required")}
            </div>
          </div>
        </div>

        <div className="row mt-3">
          
          <div className="col-md-6">
            <label className="form-label fw-bold">Status*</label>
            <select
              name="status"
              value={form.status || ""}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select Status</option>
              <option>Permanent</option>
              <option>Contract</option>
            </select>
            <div style={{ color: "red", fontSize: 13 }}>
              {validator.current.message("status", form.status, "required")}
            </div>
          </div>
        </div>

        
        <div className="mt-4 d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary fw-bold"
            onClick={() => navigate("/")}
            style={{ border:"1px solid #dee2e6" }}
          >
            Cancel
          </button>

          <button className="btn btn-primary fw-bold" type="submit">
            {id ? "Update" : "Submit"}
            
          </button>
        </div>
      </form>
    </div>
  );
}
