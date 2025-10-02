
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import { Layout, Home, Users, NotFound,AddUser } from "./pages/";
import { UsersProvider } from "./context/UsersContext"; 

import {UsersProfileComp} from "./components"

function App() {
  return (
     <UsersProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<UsersProfileComp />} />
             <Route path="add" element={<AddUser />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UsersProvider>
  );
}

export default App;
