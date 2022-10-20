import axios from "axios"

const baseUrl = 'mocks/carsBrand.json'

const brandService = {
    getBrands: async function () {
        const res = await axios.get(baseUrl)
        return res.data
    }
}
export default brandService