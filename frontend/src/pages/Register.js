import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import "../styles/Register.css";

function Register() {
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "user"
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

        const response = await api.post("/auth/register", formData);

        alert(response.data.message);

        navigate("/");

    } catch (error) {

        alert("Registration Failed");

    }

}

return (

    <div className="register-container">

        <div className="register-box">

            <h1>Create Account</h1>

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

                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                >
                    <option value="user">User</option>
                    <option value="artist">Artist</option>
                </select>

                <button type="submit">
                    Register
                </button>

            </form>

            <p>

                Already have an account?

                <Link to="/">
                    Login
                </Link>

            </p>

        </div>

    </div>

);
}

export default Register;