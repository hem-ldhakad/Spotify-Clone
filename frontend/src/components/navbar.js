import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/NavBar.css";

function Navbar() {

    const navigate = useNavigate();

    async function handleLogout() {

        try {

            await api.post("/auth/logout");

            alert("Logged Out");

            navigate("/");

        } catch (error) {

            console.log(error);

        }

    }

    return (

        <nav className="navbar">

            <Link to="/home">
                Home
            </Link>

            <Link to="/albums">
                Albums
            </Link>

            <Link to="/upload">
                Upload Music
            </Link>

            <Link to="/album/create">
                Create Album
            </Link>

            <button
                className="logout-btn"
                onClick={handleLogout}
            >
                Logout
            </button>

        </nav>

    );

}

export default Navbar;