import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Content from "./pages/Content";
import Login from "./pages/Login";
import BaseLayout from "./components/BaseLayout";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import RequireNotLoggedIn from "./components/RequireNotLoggedIn";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<BaseLayout />}>

            {/* Public Routes */}
            <Route index element={<Home />} />
            
            <Route element={<RequireNotLoggedIn />}>
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
            </Route>

            <Route element={<RequireAuth />}>
              <Route path='users' element={<Content />} />
            </Route>

            <Route path='*' element={<h1>The page you requested was not found!</h1>} />
            


          </Route>
          {/* <Route path='/' element={<Landing />} /> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
