import axios from 'axios'

export default class LaborantService{

    async getAllLaborants() {
        return await axios.get(`http://localhost:8080/api/laborants/getAll`)
    }

    async getAllActiveLaborants() {
        return await axios.get(`http://localhost:8080/api/laborants/getAllActiveLaborants`)
    }

    async getLaborantById(laborantId){
        return await axios.get(`http://localhost:8080/api/laborants/getById/${laborantId}`)
    }

    async deleteLaborantById(laborantId){
        axios.delete(`http://localhost:8080/api/laborants/delete/${laborantId}`)
    }

    async changeActiveState(laborantId){
        return axios.put(`http://localhost:8080/api/laborants/changeActiveState/${laborantId}`)
    }

    async updateLaborantById(jsonData){
        //console.log(jsonData)
        return axios.put(`http://localhost:8080/api/laborants/update`, jsonData, {headers: {'Content-Type': 'application/json'}})
    }

    async addLaborant(jsonData){
        return axios.post(`http://localhost:8080/api/laborants/add`, jsonData, {headers: {'Content-Type': 'application/json'}})
    }
}