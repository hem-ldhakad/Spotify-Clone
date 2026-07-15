import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import UploadMusic from "./pages/UploadMusic";
import Albums from "./pages/Albums";
import AlbumDetails from "./pages/AlbumDetails";
import CreateAlbum from "./pages/CreateAlbum";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    
    return (
        <Routes>

            <Route path="/" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route
                path="/home"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/upload"
                element={
                    <ProtectedRoute>
                        <UploadMusic />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/albums"
                element={
                    <ProtectedRoute>
                        <Albums />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/albums/:albumId"
                element={
                    <ProtectedRoute>
                        <AlbumDetails />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/album/create"
                element={
                    <ProtectedRoute>
                        <CreateAlbum />
                    </ProtectedRoute>
                }
            />

        </Routes>
    );
}

export default App;