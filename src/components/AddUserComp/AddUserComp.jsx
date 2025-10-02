import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../context/UsersContext";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Grid,
  Box,
} from "@mui/material";

const AddUserComp = () => {
  const { addUser, users } = useUsers();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: ""
    },
    company: {
      name: "",
      catchPhrase: "",
      bs: ""
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: users.length + 1,
      ...formData
    };
    addUser(newUser);
    setOpen(false);
    navigate("/users");
  };

  return (
    <div>
<Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
  <Button
    variant="outlined"
    color="primary"
    onClick={() => navigate(-1)}
  >
    ← Back
  </Button>
  <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
    + Add User
  </Button>
</Box>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleSubmit}>
            <Grid 
              container 
              spacing={4} 
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Grid item xs={12} md={3.5}>
                <Typography variant="h6" gutterBottom>Personal Info</Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField label="Name" name="name" value={formData.name} onChange={handleChange} required />
                  <TextField label="Username" name="username" value={formData.username} onChange={handleChange} />
                  <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                  <TextField label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
                  <TextField label="Website" name="website" value={formData.website} onChange={handleChange} />
                </Box>
              </Grid>

              <Grid item xs={12} md={3.5}>
                <Typography variant="h6" gutterBottom>Address</Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField label="Street" value={formData.address.street} onChange={(e) => handleNestedChange("address", "street", e.target.value)} />
                  <TextField label="Suite" value={formData.address.suite} onChange={(e) => handleNestedChange("address", "suite", e.target.value)} />
                  <TextField label="City" value={formData.address.city} onChange={(e) => handleNestedChange("address", "city", e.target.value)} />
                  <TextField label="Zipcode" value={formData.address.zipcode} onChange={(e) => handleNestedChange("address", "zipcode", e.target.value)} />
                </Box>
              </Grid>

              <Grid item xs={12} md={3.5}>
                <Typography variant="h6" gutterBottom>Company</Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField label="Name" value={formData.company.name} onChange={(e) => handleNestedChange("company", "name", e.target.value)} />
                  <TextField label="Catch Phrase" value={formData.company.catchPhrase} onChange={(e) => handleNestedChange("company", "catchPhrase", e.target.value)} />
                  <TextField label="BS" value={formData.company.bs} onChange={(e) => handleNestedChange("company", "bs", e.target.value)} />
                </Box>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="error">Cancel</Button>
          <Button onClick={handleSubmit} type="submit" variant="contained" color="success">
            Save User
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddUserComp;
