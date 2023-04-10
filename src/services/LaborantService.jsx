import axios from 'axios'

export default class LaborantService{

    async getAllLaborants() {
        return axios.get(`http://localhost:8080/api/laborants/getAll`)
    }

}