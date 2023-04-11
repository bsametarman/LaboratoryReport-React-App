import axios from 'axios'

export default class LaborantService{

    async getAllLaborants() {
        return await axios.get(`http://localhost:8080/api/laborants/getAll`)
    }

}