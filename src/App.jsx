import { Routes, Route } from "react-router-dom";
import RequireAuth from "./features/auth/RequireAuth";
import Layout from "./layout/index";
import Home from "./pages/Home";
import HomeAuth from "./pages/HomeAuth";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import CheckToken from "./layout/CheckToken";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<CheckToken />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Registro />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="user" element={<HomeAuth />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
