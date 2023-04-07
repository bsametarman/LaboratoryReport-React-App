import axios from "axios";

export default class ReportService{
    getReports(){
        return axios.get("http://localhost:8080/api/reports/getAll")
    }
}