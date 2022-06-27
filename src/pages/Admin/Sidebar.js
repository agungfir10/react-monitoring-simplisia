import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export const Sidebar = () => {
  const [toggled, setToggled] = React.useState(false);

  const onClick = () => {
    setToggled(!toggled);
  };
  return (
    <React.Fragment>
      {/* <!-- Sidebar --> */}
      <ul
        className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${
          toggled ? 'toggled' : ''
        }`}
        id="accordionSidebar"
      >
        {/* <!-- Sidebar - Brand --> */}
        <Link
          className="sidebar-brand d-flex align-items-center justify-content-center"
          to="/"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">Monitoring Simplisia</div>
        </Link>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider my-0" />

        {/* <!-- Nav Item - Dashboard --> */}
        <li className="nav-item">
          <NavLink className="nav-link" to="/admin">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </NavLink>
        </li>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider" />

        {/* <!-- Heading - Main --> */}
        <div className="sidebar-heading">Main</div>

        {/* <!-- Nav Item - Pages Collapse Menu --> */}

        {/* <!-- Nav Item - Category --> */}
        <li className="nav-item">
          <NavLink className="nav-link active" to="/admin/table">
            <i className="fas fa-fw fa-table"></i>
            <span>Tabel</span>
          </NavLink>
        </li>
        {/* <!-- Nav Item - Machines --> */}
        <li className="nav-item">
          <NavLink className="nav-link" to="/admin/machines">
            <i className="fas fa-fw fa-cog"></i>
            <span>Mesin</span>
          </NavLink>
        </li>
        {/* <!-- Divider --> */}
        <hr className="sidebar-divider d-none d-md-block" />

        {/* <!-- Sidebar Toggler (Sidebar) --> */}
        <div className="text-center d-none d-md-inline">
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
            onClick={onClick}
          ></button>
        </div>
      </ul>
      {/* <!-- End of Sidebar --> */}
    </React.Fragment>
  );
};
