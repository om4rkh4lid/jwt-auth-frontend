import useAuth from "../hooks/useAuth";

const RequireRoles = ({ allowedRoles, children }) => {
  const { auth } = useAuth();

  return(
    auth && allowedRoles && auth.roles?.find(role => allowedRoles?.includes(role)) && children
  );
}

export default RequireRoles;