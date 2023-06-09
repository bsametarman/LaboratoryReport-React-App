import axios from "axios";

export default class ReportService{
    async getReports(){
        return axios.get("http://localhost:8080/api/reports/getAll")
    }

    async getActiveReportsDesc(){
        return axios.get("http://localhost:8080/api/reports/getAllActiveReportsDateDesc")
    }

    async getActiveReportsAsc(){
        return axios.get("http://localhost:8080/api/reports/getAllActiveReportsDateAsc")
    }

    async getActiveReports(){
        return axios.get("http://localhost:8080/api/reports/getAllActiveReports")
    }

    async getReportById(id){
        return axios.get(`http://localhost:8080/api/reports/getById/${id}`)
    }

    async deleteReportById(id){
        axios.delete(`http://localhost:8080/api/reports/delete/${id}`)
    }

    async changeActiveState(id){
        return axios.put(`http://localhost:8080/api/reports/changeActiveState/${id}`)
    }

    async updateReportById(jsonData){
        return axios.put(`http://localhost:8080/api/reports/update`, jsonData, {headers: {'Content-Type': 'application/json'}})
    }

    async addReport(jsonData){
        return axios.post(`http://localhost:8080/api/reports/add`, jsonData, {headers: {'Content-Type': 'application/json'}})
    }
}