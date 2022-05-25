import instance from "../api/api";

class ApiService {
    static async getArtists() {
        return instance.get('artists/')
    }
}

export default ApiService
