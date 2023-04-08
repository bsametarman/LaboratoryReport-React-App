import axios from "axios";

export default class ReportService{
    async getReports(){
        return axios.get("http://localhost:8080/api/reports/getAll")
    }

    async getReportById(id){
        return axios.get(`http://localhost:8080/api/reports/getById/${id}`);
    }
}