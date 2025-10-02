import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Stack, Button, Box } from "@mui/material";

const HomeComp = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 6 }}>
      <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
        Welcome 
      </Typography>

      <Typography variant="h5" color="text.secondary" gutterBottom>
        This is a <strong>Mini User Management App</strong> built for{" "}
        <em>LinkPlus IT Internship Task</em>.
      </Typography>

      <Typography variant="body1" sx={{ mt: 2 }}>
        Here you can explore the list of users, search for someone, or add new people
        to the system. It’s a simple app, but it shows off how routing, forms, and data
        fetching can work together in React.
      </Typography>

      

    
      <Box sx={{ mt: 8, textAlign: "left" }}>
        <Typography variant="h6" gutterBottom>
           How this app is built
        </Typography>
        <Typography variant="body2" paragraph>
          - The app is built with <strong>React</strong> and uses{" "}
          <strong>React Router DOM</strong> for navigation between pages.
        </Typography>
        <Typography variant="body2" paragraph>
          - Instead of Redux, state management is handled with{" "}
          <strong>Context API</strong> for a simpler and cleaner approach.
        </Typography>
        <Typography variant="body2" paragraph>
          - The UI is a mix of styles: some components are built with{" "}
          <strong>pure CSS</strong>, while others leverage{" "}
          <strong>Material UI</strong> for a modern look and feel.
        </Typography>
           <Typography variant="body2" paragraph>
          - The app includes full <strong>CRUD functionality</strong>: you can{" "}
          <strong>add</strong>, <strong>edit</strong>, and <strong>delete</strong>{" "}
          users dynamically.
        </Typography>
        <Typography variant="body2" paragraph>
          - Newly added users are also saved in <strong>LocalStorage</strong>,
          so data will persist even after a page refresh.
        </Typography>
        <Typography variant="body2" paragraph>
          - The project follows a <strong>clean folder structure</strong> for
          easier navigation and scalability.
        </Typography>
           <Typography variant="body2" paragraph>
          - The app is <strong>deployed on Vercel</strong> for testing purposes,
          making it accessible online with just a link.
        </Typography>
      </Box>
      <Box sx={{ mt: 5 , mb: 5}}>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            component={Link}
            to="/users"
            variant="contained"
            color="primary"
            size="large"
          >
            Browse Users
          </Button>
          <Button
            component={Link}
            to="/add"
            variant="outlined"
            color="secondary"
            size="large"
          >
            Add New User
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default HomeComp;
