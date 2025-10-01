
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import {Layout, Home, Users, NotFound} from "./pages/"; 

function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Outlet/>
    </BrowserRouter>
  );
}

export default App;
