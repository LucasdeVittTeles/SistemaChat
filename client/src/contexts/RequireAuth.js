import LoginPage from "../Pages/loginPage/loginPage";

export const RequireAuth = ({ children }) => {
  if (!localStorage.getItem("token")) {
    return <LoginPage />;
  }
  return children;
};
