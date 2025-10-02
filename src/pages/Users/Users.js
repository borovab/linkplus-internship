import React from 'react'
import {UsersComp} from '../../components/index'
import { Box, Button } from "@mui/material";
import {  useNavigate } from "react-router-dom";

const Users = () => {
    const navigate = useNavigate();

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
            </Box>
      <UsersComp/>
    </div>
  )
}

export default Users