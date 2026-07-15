const musicModel = require("../models/music.model")
const {uploadFile} = require("../services/storage.service")
const jwt = require("jsonwebtoken");
const albumModel = require("../models/album.model")

async function createMusic(req, res) {
    
    const {title} = req.body
    const file = req.file

    const result = await uploadFile(file.buffer.toString('base64'))

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: req.user.id
    })
    
    res.status(201).json({
        message: "music created",
        music: {
            id: music._id,
            uri: music.uri,
            title: music.title,
            artist: music.artist
        }
    })
    } 

async function createAlbum(req, res) {

    const {title, musics} = req.body
    const album = await albumModel.create({
        title,
        artist: req.user.id,
        musics: musics
    })

    res.status(201).json({
        message: "album created",
        album: {
            id: album._id,
            title: album.title,
            artist: album.artist,
            musics: album.musics
        }
    })

} 

async function getAllmusic(req, res) {
    const musics = await musicModel
    .find()
    // .skip(1) //skip first two
    // .limit(2) // limit the no of songs
    .populate("artist", "username email")

console.log(await musicModel.find());

console.log(await musicModel.findById("6a55484d65b38cbbadf33b7e"));
    //populate gives full detail of artist
    res.status(200).json({
        message: "Musics fetched successfully",
        musics: musics
    })
}
async function getAllAlbums(req, res) {
    const albums = await albumModel.find().select("title artist").populate("artist", "username email")
    //select for only title and artist not musics
    res.status(200).json({
        message: "Albums fetched successfully",
        albums: albums
    })
}

async function getAlbumById(req, res) {
    const albumId = req.params.albumId
    const album = await albumModel.findById(albumId).populate("artist", "username email").populate("musics")
    return res.status(200).json({
        message: "album fetched",
        album: album
    })
}

module.exports = {createMusic, createAlbum, getAllmusic, getAllAlbums, getAlbumById}