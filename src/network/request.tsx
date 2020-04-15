import axios from 'axios'
const instance = axios.create({
    timeout:20000,
    baseURL:'http://localhost；3001'
})

export * from 'axios'

export default instance