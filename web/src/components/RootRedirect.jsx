import { Navigate } from "react-router-dom";

const RootRedirect = () => {
  const token = localStorage.getItem("token");
  return <Navigate to={token ? "/home" : "/login"} replace />;
};

export default RootRedirect;
