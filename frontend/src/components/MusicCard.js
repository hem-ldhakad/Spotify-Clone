import "../styles/MusicCard.css";
function MusicCard({ music }) {

    return (

        <div className="music-card">

            <h2>{music.title}</h2>

            <p>

                Artist : {music.artist.username}

            </p>

            <audio controls>

                <source
                    src={music.uri}
                    type="audio/mpeg"
                />

            </audio>

        </div>

    );

}

export default MusicCard;