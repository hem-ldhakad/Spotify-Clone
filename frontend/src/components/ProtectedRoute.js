import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

    const isLoggedIn = document.cookie.includes("token");

    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;