import instance from "../api/api";

class ApiService {
    static async getArtists() {
        return instance.get('artists/')
    }

    static async getArtist(artist_id) {
        return instance.get(`artists/${artist_id}`)
    }

    static async getAlbums() {
        return instance.get('albums/')
    }

    static async getAlbum(album_id) {
        return instance.get(`albums/${album_id}`)
    }

    static async getTracks() {
        return instance.get('tracks/')
    }

    static async getPlaylists() {
        return instance.get('playlists/')
    }

    static async getPlaylist(playlist_id) {
        return instance.get(`playlists/${playlist_id}`)
    }

    static async getPlaylistTracks(playlist_id) {
        return instance.get(`playlists/${playlist_id}/tracks`)
    }

    static async getArtistTracks(artist_id) {
        return instance.get(`artists/${artist_id}/tracks`)
    }

    static async getAlbumTracks(album_id) {
        return instance.get(`albums/${album_id}/tracks`)
    }

    static async createLike(trackId) {
        return instance.get(`tracks/${trackId}/like`)
    }

    static async createPlaylist(title) {
        return instance.post('playlists/create',{title})
    }

    static async deletePlaylist(playlist_id) {
        return instance.delete(`playlists/${playlist_id}/delete`)
    }

    static async playlistAddTrack(playlist_id, track_id) {
        return instance.get(`playlists/${playlist_id}/${track_id}`)
    }
}

export default ApiService
