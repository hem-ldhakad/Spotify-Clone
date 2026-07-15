import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import MusicCard from "../components/MusicCard";
import Navbar from "../components/navbar";
import "../styles/Home.css";

function Home() {

    const [musics, setMusics] = useState([]);

    const navigate = useNavigate();

    async function fetchMusic() {

        try {

            const response = await api.get("/music");

            setMusics(response.data.musics);

        } catch (error) {

            console.log(error);

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Server Error");
            }

        }

    }

    async function logout() {

        try {

            const response = await api.post("/auth/logout");

            alert(response.data.message);

            navigate("/");

        } catch (error) {

            console.log(error);

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Server Error");
            }

        }

    }

    useEffect(() => {

        fetchMusic();

    }, []);

return (

    <div className="home">

        <Navbar />

        <h1>Spotify Clone</h1>

        <div className="music-container">

            {
                musics.length === 0 ?

                <h2>No Music Available</h2>

                :

                musics.map((music) => (

                    <MusicCard
                        key={music._id}
                        music={music}
                    />

                ))
            }

        </div>

    </div>

);

}

export default Home;