import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useUsers } from "../../context/UsersContext";
import "./UsersProfileComp.css";
import googleicon from "../../assets/googlemap.png";

const UsersProfileComp = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, updateUser, deleteUser } = useUsers();

  const user = users.find((u) => u.id === Number(id));
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  if (!user) return <p>User not found...</p>;

  const mapsLink = `https://www.google.com/maps?q=${user.address?.geo?.lat},${user.address?.geo?.lng}`;
  const handleMapClick = () => {
    window.open(mapsLink, "_blank");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleSave = () => {
    updateUser(user.id, formData);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      deleteUser(user.id);
      navigate("/users"); 
    }
  };

  return (
    <div className="profile-container">
      <Link to="/users" className="name-link">← Back to Users</Link>
      <h2>{!isEditing ? user.name : (
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      )}</h2>

      {!isEditing ? (
        <>
          <div className="profile-section">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Website:</strong> {user.website}</p>
          </div>
          <div className="profile-section">
            <h3>Address</h3>
            <p><strong>Street:</strong> {user.address?.street}</p>
            <p><strong>Suite:</strong> {user.address?.suite}</p>
            <p><strong>City:</strong> {user.address?.city}</p>
            <p><strong>Zipcode:</strong> {user.address?.zipcode}</p>
            <img
              className="ikona-google"
              onClick={handleMapClick}
              src={googleicon}
              alt="Google Maps"
              style={{ cursor: "pointer", width: "30px" }}
            />
          </div>
          <div className="profile-section">
            <h3>Company</h3>
            <p><strong>Name:</strong> {user.company?.name}</p>
            <p><strong>Catch Phrase:</strong> {user.company?.catchPhrase}</p>
            <p><strong>BS:</strong> {user.company?.bs}</p>
          </div>

          <div className="actions">
            <button className="btn-edit" onClick={() => setIsEditing(true)}>Edit</button>
            <button className="btn-delete" onClick={handleDelete}>Delete</button>
          </div>
        </>
      ) : (
        <>
          <div className="profile-section">
            <label>Username:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            <label>Phone:</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
            <label>Website:</label>
            <input type="text" name="website" value={formData.website} onChange={handleChange} />
          </div>
          <div className="profile-section">
            <h3>Address</h3>
            <label>Street:</label>
            <input
              type="text"
              value={formData.address?.street}
              onChange={(e) => handleNestedChange("address", "street", e.target.value)}
            />
            <label>Suite:</label>
            <input
              type="text"
              value={formData.address?.suite}
              onChange={(e) => handleNestedChange("address", "suite", e.target.value)}
            />
            <label>City:</label>
            <input
              type="text"
              value={formData.address?.city}
              onChange={(e) => handleNestedChange("address", "city", e.target.value)}
            />
            <label>Zipcode:</label>
            <input
              type="text"
              value={formData.address?.zipcode}
              onChange={(e) => handleNestedChange("address", "zipcode", e.target.value)}
            />
          </div>
          <div className="profile-section">
            <h3>Company</h3>
            <label>Name:</label>
            <input
              type="text"
              value={formData.company?.name}
              onChange={(e) => handleNestedChange("company", "name", e.target.value)}
            />
            <label>Catch Phrase:</label>
            <input
              type="text"
              value={formData.company?.catchPhrase}
              onChange={(e) => handleNestedChange("company", "catchPhrase", e.target.value)}
            />
            <label>BS:</label>
            <input
              type="text"
              value={formData.company?.bs}
              onChange={(e) => handleNestedChange("company", "bs", e.target.value)}
            />
          </div>
          <div className="actions">
            <button className="btn-save" onClick={handleSave}>Save</button>
            <button className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
            <button className="btn-delete" onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default UsersProfileComp;
