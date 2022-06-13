import instance from "../api/api";

class ApiService {
    static async getArtists() {
        return instance.get('artists/')
    }

    static async getAlbums() {
        return instance.get('albums/')
    }

    static async getTracks() {
        return instance.get('tracks/')
    }
}

export default ApiService
