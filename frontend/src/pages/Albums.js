import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/Albums.css";
import Navbar from "../components/navbar";

function Albums() {

    const [albums, setAlbums] = useState([]);

    async function fetchAlbums() {

        try {

            const response = await api.get("/music/albums");

            setAlbums(response.data.albums);

        } catch (error) {

            console.log(error);

            if (error.response) {
                alert(error.response.data.message);
            }

        }

    }

    useEffect(() => {

        fetchAlbums();

    }, []);

    return (

        <>
    <Navbar />

    <div className="albums-page">

        <h1>Albums</h1>

        <div className="album-grid">

            {albums.map((album) => (

                <div
                    key={album._id}
                    className="album-card"
                >

                    <h2>{album.title}</h2>

                    <p>
                        Artist : {album.artist.username}
                    </p>

                    <Link to={`/albums/${album._id}`}>
                        View Album
                    </Link>

                </div>

            ))}

        </div>

    </div>

</>

    );

}

export default Albums;