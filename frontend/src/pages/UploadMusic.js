import { useState } from "react";
import api from "../services/api";
import "../styles/UploadMusic.css";
import Navbar from "../components/navbar";

function UploadMusic() {

    const [title, setTitle] = useState("");
    const [music, setMusic] = useState(null);

    function handleFileChange(event) {

        setMusic(event.target.files[0]);

    }

    async function handleSubmit(event) {

        event.preventDefault();

        const formData = new FormData();

        formData.append("title", title);
        formData.append("music", music);

        try {

            const response = await api.post(
                "/music/upload",
                formData
            );

            alert(response.data.message);

            setTitle("");
            setMusic(null);

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

        <div className="upload-container">

            <div className="upload-box">

                <h1>Upload Music</h1>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder="Music Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <input
                        type="file"
                        accept="audio/*"
                        onChange={handleFileChange}
                    />

                    <button type="submit">
                        Upload
                    </button>

                </form>

            </div>

        </div>
    </>
    );

}

export default UploadMusic;