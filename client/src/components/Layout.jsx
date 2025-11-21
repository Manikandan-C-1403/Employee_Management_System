import React from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import AvatorImg from "../../public/avator.png";

export default function Layout() {
  const { pathname } = useLocation();

  const isEmployeeActive =
    pathname === "/" ||
    pathname.includes("add") ||
    pathname.includes("edit") ||
    pathname.includes("view") ||
    pathname.includes("employee");

  return (
    <div style={{ display: "flex" }}>
      <aside className="sidebar">
        <div className="brand">EMP-DB</div>
        <hr className=""/>

        <nav className="py-3">
          <NavLink to="/dashboard" className="nav-item">
            <i className="bi bi-grid-fill"></i> Dashboard
          </NavLink>

          <NavLink
            to="/employee"
            className={isEmployeeActive ? "nav-item active" : "nav-item"}
          >
            <i className="bi bi-people-fill"></i> Employee
          </NavLink>

          <NavLink to="/calendar" className="nav-item">
            <i className="bi bi-calendar-event"></i> Calendar
          </NavLink>

          <NavLink to="/messages" className="nav-item">
            <i className="bi bi-chat-left-text"></i> Messages
          </NavLink>
        </nav>
      </aside>

      <div style={{ flex: 1 }}>
        <header className="topbar">
          <div></div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button className="btn btn-light rounded-circle">
              <i className="bi bi-gear-fill"></i>
            </button>

            <button className="btn btn-light rounded-circle">
              <i className="bi bi-bell-fill"></i>
            </button>

            <img
              src={AvatorImg}
              style={{ width: 38, height: 38, borderRadius: 20 }}
              alt="user"
            />
          </div>
        </header>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
