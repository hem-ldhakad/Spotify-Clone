import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/AlbumDetails.css";
import Navbar from "../components/navbar";

function AlbumDetails() {

    const { albumId } = useParams();

    const [album, setAlbum] = useState(null);

    async function fetchAlbum() {

        try {

            const response = await api.get(`/music/albums/${albumId}`);

            setAlbum(response.data.album);

        } catch (error) {

            console.log(error);

            if (error.response) {
                alert(error.response.data.message);
            }

        }

    }

    useEffect(() => {

        fetchAlbum();

    }, []);

    if (!album) {

        return <h2>Loading...</h2>;

    }

    return (
<>
    <Navbar />

    <div className="album-details">

        <h1>{album.title}</h1>

        <h3>Artist : {album.artist.username}</h3>

        {album.musics.map((music) => (

            <div
                key={music._id}
                className="song"
            >

                <h2>{music.title}</h2>

                <audio controls>

                    <source
                        src={music.uri}
                        type="audio/mpeg"
                    />

                </audio>

            </div>

        ))}

    </div>

</>
    );

}

export default AlbumDetails;