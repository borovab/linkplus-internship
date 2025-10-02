import React, { createContext, useEffect, useState, useContext } from "react";
import * as XLSX from "xlsx";

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // load nga localStorage ose nga API
  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
          localStorage.setItem("users", JSON.stringify(data));
        })
        .catch((err) => console.error("Error fetching users:", err));
    }
  }, []);

  // kurdo që ndryshon users → ruaj në localStorage
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const exportToExcel = () => {
    const header = [["Users List - LinkPlus IT"]];
    const columnHeaders = [["Name", "Username", "Email", "Phone", "Company", "Website"]];
    const rows = filteredUsers.map((user) => [
      user.name,
      user.username,
      user.email,
      user.phone,
      user.company?.name,
      user.website,
    ]);
    const worksheetData = [...header, [], ...columnHeaders, ...rows];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "users.xlsx");
  };

  // update user
  const updateUser = (id, updatedUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...updatedUser } : u))
    );
  };

  // delete user
  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  // add user
  const addUser = (newUser) => {
    setUsers((prev) => [newUser, ...prev]);
  };

  return (
    <UsersContext.Provider
      value={{ users, search, setSearch, filteredUsers, exportToExcel, updateUser, deleteUser, addUser }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);
