import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../Pages/homePage/homePage";
import LoginPage from "../Pages/loginPage/loginPage";
import { RequireAuth } from "../contexts/RequireAuth";
import RegistrationPage from "../Pages/registrationPage/registrationPage";

const Rotas = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RequireAuth><HomePage /></RequireAuth>} />
        <Route path="/loginPage" element={<LoginPage/>}/>
         <Route path="/registrationPage" element={<RegistrationPage/>}/>
      </Routes>
    </Router>
  );
};

export default Rotas;
