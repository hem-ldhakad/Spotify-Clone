import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Login.css";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            const response = await api.post("/auth/login", formData);

            alert(response.data.message);

            navigate("/home");

        } catch (error) {

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Server is not responding");
            }

        }

    }

return (

    <div className="login-container">

        <div className="login-box">

            <h1>Spotify Login</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <button type="submit">
                    Login
                </button>

            </form>

            <p>

                Don't have an account?

                <Link to="/register">
                    Register
                </Link>

            </p>

        </div>

    </div>

);

}

export default Login;