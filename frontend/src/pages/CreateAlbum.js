import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/navbar";
import "../styles/CreateAlbum.css";

function CreateAlbum() {

    const [title, setTitle] = useState("");
    const [musics, setMusics] = useState([]);
    const [selectedMusics, setSelectedMusics] = useState([]);

    async function fetchMusics() {

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

    useEffect(() => {

        fetchMusics();

    }, []);

    function handleCheckbox(event) {

        const musicId = event.target.value;

        if (event.target.checked) {

            setSelectedMusics([
                ...selectedMusics,
                musicId
            ]);

        } else {

            setSelectedMusics(
                selectedMusics.filter((id) => id !== musicId)
            );

        }

    }

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            const response = await api.post("/music/album", {
                title,
                musics: selectedMusics
            });

            alert(response.data.message);

            setTitle("");
            setSelectedMusics([]);

        } catch (error) {

            console.log(error);

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Server Error");
            }

        }

    }

    return (
        <>
            <Navbar />

            <div className="create-album">

                <div className="create-box">

                    <h1>Create Album</h1>

                    <form onSubmit={handleSubmit}>

                        <input
                            type="text"
                            placeholder="Album Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <h3>Select Songs</h3>

                        {
                            musics.length === 0 ?

                                <p>No Songs Available</p>

                                :

                                musics.map((music) => (

                                    <div className="music-item" key={music._id}>

                                        <input
                                            type="checkbox"
                                            id={music._id}
                                            value={music._id}
                                            onChange={handleCheckbox}
                                        />

                                        <label htmlFor={music._id}>
                                            {music.title}
                                        </label>

                                    </div>

                                ))
                        }

                        <br />

                        <button type="submit">
                            Create Album
                        </button>

                    </form>

                </div>

            </div>

        </>
    );

}

export default CreateAlbum;