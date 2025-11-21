import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import EmployeeList from "./pages/EmployeeList";
import EmployeeForm from "./pages/EmployeeForm";
import ViewEmployee from "./pages/ViewEmployee";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<EmployeeList />} />
          <Route path="employee" element={<EmployeeList />} />
          <Route path="add" element={<EmployeeForm />} />
          <Route path="edit/:id" element={<EmployeeForm />} />
          <Route path="view/:id" element={<ViewEmployee />} />
          <Route path="dashboard" element={<h2>Dashboard Page</h2>} />
          <Route path="calendar" element={<h2>Calendar Page</h2>} />
          <Route path="messages" element={<h2>Messages Page</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
