import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUsers } from "../../context/UsersContext";
import "./UsersComp.css";

// loader
import { Mosaic } from "react-loading-indicators";

const UsersComp = () => {
  const { search, setSearch, filteredUsers, exportToExcel } = useUsers();
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSort = (key) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDirection("asc");
    } else {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortKey(null);
        setSortDirection(null);
      } else {
        setSortDirection("asc");
      }
    }
  };

  const sortedUsers = [...filteredUsers];
  if (sortKey && sortDirection) {
    sortedUsers.sort((a, b) => {
      const valA =
        sortKey === "company"
          ? a.company?.name?.toLowerCase()
          : a[sortKey]?.toString().toLowerCase();
      const valB =
        sortKey === "company"
          ? b.company?.name?.toLowerCase()
          : b[sortKey]?.toString().toLowerCase();

      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <Mosaic
          size={100}
          color="#3182ce"
          style={{ animation: "fadeColor 2s infinite alternate" }}
        />
      </div>
    );
  }

  return (
    <div className="users-container">
      <h2 className="users-title">Users List</h2>

      <div className="actions">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <div className="sort-buttons">
          <button onClick={() => handleSort("name")}>
            Name{" "}
            {sortKey === "name"
              ? sortDirection === "asc"
                ? "↑"
                : sortDirection === "desc"
                ? "↓"
                : "•"
              : ""}
          </button>
          <button onClick={() => handleSort("email")}>
            Email{" "}
            {sortKey === "email"
              ? sortDirection === "asc"
                ? "↑"
                : sortDirection === "desc"
                ? "↓"
                : "•"
              : ""}
          </button>
          <button onClick={() => handleSort("company")}>
            Company{" "}
            {sortKey === "company"
              ? sortDirection === "asc"
                ? "↑"
                : sortDirection === "desc"
                ? "↓"
                : "•"
              : ""}
          </button>
        </div>

        <div className="export-buttons">
          <button onClick={exportToExcel} className="btn-export">
            Export Excel
          </button>
        </div>
      </div>

      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Website</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`} className="name-link">
                  {user.name}
                </Link>
              </td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.company?.name}</td>
              <td>{user.website}</td>
              <td>
                <Link to={`/users/${user.id}`} className="btn-details">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersComp;
