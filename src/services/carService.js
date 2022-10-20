import axios from "axios"

const baseUrl = '/cars.json'

const carService = {
    getCars: async function () {
        const res = await axios.get(baseUrl)
        return res.data
    }
}
export default carService