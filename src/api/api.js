import axios from "axios";


const instance = axios.create({
    baseURL: 'https://rickandmortyapi.com/api'
})

export const mainAPI = {
    getData(page) {
        return instance.get(`/character/?page=${page}`)
    },

    getCharacter(id) {
        return instance.get(`/character/${id}`)
    },

    getEpisode(id) {
        return instance.get(`/episode/${id}`)
    }
}