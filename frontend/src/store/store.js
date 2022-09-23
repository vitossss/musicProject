import {makeAutoObservable} from 'mobx'
import AuthService from "../services/AuthService";
import ApiService from "../services/ApiService";

class Store {
    isAuth = true
    user = {}

    artists = []
    artist = {}
    albums = []
    album = {}
    playlists = []
    playlist = {}

    isPlaying = true
    tracks = []
    artist_tracks = []
    album_tracks = []
    playlist_tracks = []

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    setArtists(artists) {
        this.artists = artists;
    }

    setArtist(artist) {
        this.artist = artist;
    }

    setAlbums(albums) {
        this.albums = albums
    }

    setAlbum(album) {
        this.album = album
    }

    setTracks(tracks) {
        this.tracks = tracks
    }

    setArtistTracks(tracks) {
        this.artist_tracks = tracks
    }

    setAlbumTracks(tracks) {
        this.album_tracks = tracks
    }

    setPlaylists(playlists) {
        this.playlists = playlists
    }

    setPlaylist(playlist) {
        this.playlist = playlist
    }

    setPlaylistTracks(tracks) {
        this.playlist_tracks = tracks
    }

    setIsPlaying(bool) {
        this.isPlaying = bool
    }

    async login(email, password) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.auth_token);
            // const auth_me = await AuthService.me();
            this.setAuth(!this.isAuth)
            // this.setUser(auth_me.data);
            return response;
        } catch (e) {
            return e;
        }
    }

    async register(username, email, password) {
        try {
            const response = await AuthService.register(username, email, password);
            await this.login(email, password);
            return response;
        } catch (e) {
            return e;
        }
    }

    async checkAuth() {
        try {
            const response = await AuthService.me();
            this.setAuth(true)
            this.setUser(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            const prevResult = this.isAuth;
            this.setAuth(!prevResult);
            this.setUser({})
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async getArtists() {
        try {
            const response = await ApiService.getArtists();
            this.setArtists(response.data)
        } catch (e) {
            console.log(e);
        }
    }

    async getArtist(artist_id) {
        try {
            const response = await ApiService.getArtist(artist_id);
            this.setArtist(response.data)
        } catch (e) {
            console.log(e);
        }
    }

    async getAlbums() {
        try {
            const response = await ApiService.getAlbums();
            this.setAlbums(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    async getAlbum(album_id) {
        try {
            const response = await ApiService.getAlbum(album_id);
            this.setAlbum(response.data)
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    async getTracks() {
        try {
            const response = await ApiService.getTracks();
            this.setTracks(response.data)
            return response.data
        } catch (e) {
            console.log(e)
        }
    }

    async getPlaylists() {
        try {
            const response = await ApiService.getPlaylists();
            this.setPlaylists(response.data)
            return response.data
        } catch (e) {
            console.log(e)
        }
    }

    async getPlaylist(playlist_id) {
        try {
            const response = await ApiService.getPlaylist(playlist_id);
            this.setPlaylist(response.data)
            return response.data
        } catch (e) {
            console.log(e)
        }
    }

    async getPlaylistTracks(playlist_id) {
        try {
            const response = await ApiService.getPlaylistTracks(playlist_id);
            this.setPlaylistTracks(response.data)
            return response.data
        } catch (e) {
            console.log(e)
        }
    }

    async getArtistTracks(artist_id) {
        try {
            const response = await ApiService.getArtistTracks(artist_id);
            this.setArtistTracks(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    async getAlbumTracks(album_id) {
        try {
            const response = await ApiService.getAlbumTracks(album_id);
            this.setAlbumTracks(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    async createLike(track_id) {
        try {
            await ApiService.createLike(track_id).then(
                (response) => {
                    const newTrackObj = response.data // {id: number, is_liked: true/false}
                    const trackIndex = this.tracks.findIndex((elem) => elem.id === newTrackObj.id)
                    if (trackIndex !== undefined) {
                        const newTracks = this.tracks
                        newTracks[trackIndex].is_liked = newTrackObj.is_liked;
                        this.setTracks(newTracks)
                    }
                    const artistTrackIndex = this.artist_tracks.findIndex((elem) => elem.id === newTrackObj.id)
                    if (artistTrackIndex !== undefined) {
                        const newTracks = this.artist_tracks
                        newTracks[artistTrackIndex].is_liked = newTrackObj.is_liked;
                        this.setArtistTracks(newTracks)
                    }
                    const albumTrackIndex = this.album_tracks.findIndex((elem) => elem.id === newTrackObj.id)
                    if (albumTrackIndex !== undefined) {
                        const newTracks = this.album_tracks
                        newTracks[albumTrackIndex].is_liked = newTrackObj.is_liked;
                        this.setAlbumTracks(newTracks)
                    }
                    const playlistTrackIndex = this.playlist_tracks.findIndex((elem) => elem.id === newTrackObj.id)
                    if (playlistTrackIndex !== undefined) {
                        const newTracks = this.playlist_tracks
                        newTracks[playlistTrackIndex].is_liked = newTrackObj.is_liked;
                        this.setPlaylistTracks(newTracks)
                    }
                }
            )
        } catch (e) {
            console.log(e)
        }
    }

    async createPlaylist(title) {
        try {
            await ApiService.createPlaylist(title)
        } catch (e) {
            console.log(e)
        }
    }

    async deletePlaylist(playlist_id) {
        try {
            await ApiService.deletePlaylist(playlist_id)
        } catch (e) {
            console.log(e)
        }
    }

    async playlistAddTrack(playlist_id, track_id) {
        try {
            await ApiService.playlistAddTrack(playlist_id, track_id)
        } catch (e) {
            console.log(e)
        }
    }

}

export default Store;
