import axios from './request'

const entriesApi = axios.create({
    baseURL: '/api'
})

export default entriesApi