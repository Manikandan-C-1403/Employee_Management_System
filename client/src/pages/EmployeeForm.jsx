import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";
import EmployeeFormUI from "./EmployeeFormUI";
import SimpleReactValidator from "simple-react-validator";

export default function EmployeeForm() {
  const [form, setForm] = useState({
    name: "",
    employee_id: "",
    department: "",
    designation: "",
    project: "",
    type: "",
    status: "",
    profile_image: null,
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [idError, setIdError] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  
  const [, setForceUpdate] = useState(false);
  const validator = useRef(new SimpleReactValidator());

  
  useEffect(() => {
    if (!id) return;

    API.get(`/employees/${id}`)
      .then((res) => {
        setForm(res.data);

        if (res.data.profile_image) {
          setPreview(res.data.profile_image);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  async function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "employee_id") {
      if (!value.trim()) {
        setIdError("");
        return;
      }

      try {
        const res = await API.get(`/employees/check-id/${value}`);
        const exists = res.data.exists;

        if (exists && value !== form.employee_id) {
          setIdError("Employee ID already exists.");
        } else {
          setIdError("");
        }
      } catch (err) {
        console.error("ID check error:", err);
      }
    }
  }

  const handleImage = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    setFile(f);

    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setPreview(URL.createObjectURL(f));
  };

  async function submit(e) {
    e.preventDefault();

    if (!validator.current.allValid()) {
      validator.current.showMessages();
      setForceUpdate((v) => !v);
      return;
    }

    if (idError) {
      alert("Please fix the employee ID error.");
      return;
    }

    const data = new FormData();

    Object.entries(form).forEach(([k, v]) => {
      if (k !== "profile_image") data.append(k, v || "");
    });

    if (file) data.append("profile", file);

    try {
      if (id) {
        await API.put(`/employees/${id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await API.post(`/employees`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  }

  return (
    <EmployeeFormUI
      title={id ? "Edit Employee Details" : "Add New Employee"}
      form={form}
      handleChange={handleChange}
      submit={submit}
      navigate={navigate}
      preview={preview}
      handleImage={handleImage}
      idError={idError}
      validator={validator.current}
      id={id}
    />
  );
}