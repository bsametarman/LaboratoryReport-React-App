import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Select } from 'semantic-ui-react'
import ReportService from './../services/ReportService'
import LaborantService from './../services/LaborantService';

export default function ReportDetails() {

    const [report, setReport] = useState([])
    const [laborants, setLaborants] = useState([])
    const [isLoading, setLoading] = useState([])

    //const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()
    const reportService = new ReportService()
    const laborantService = new LaborantService()

    useEffect(()=>{
        setTimeout(() => {
            reportService.getReportById(params.reportId).then(result => {setReport(result.data)})
            laborantService.getAllLaborants().then(result => {setLaborants(result.data); setLoading(false);})
        }, 500)
    }, [])

    const laborantOptions = []

    laborants.forEach((laborant) => {
        laborantOptions.push({
            key: laborant.id,
            text: `${laborant.laborantName} ${laborant.laborantSurname}`,
            value: laborant.id,
        });
    });

    function createData() {
        let jsonData = {
            "id": report.id,
            "fileNo": report.fileNo,
            "patientName": report.patientName,
            "patientSurname": report.patientSurname,
            "patientIdentityNumber": report.patientIdentityNumber,
            "diagnosticTitle": report.diagnosticTitle,
            "diagnosticDetail": report.diagnosticDetail,
            "reportDate": report.reportDate,
            "laborantId": report.laborantId
        }
        jsonData = JSON.stringify(jsonData)
        reportService.updateReportById(jsonData);
    }

    if(isLoading){
        return (
            <div style={{margin: '100px'}}>Loading...</div>
        );
    }

    return (
        <div class="center" style={{marginTop: '100px', marginRight: '200px', marginLeft: '200px'}}>
            <Form>
                <Form.Group widths='equal'>
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-first-name'
                    label='Patient Name'
                    placeholder='Patient Name'
                    defaultValue = {report.patientName}
                    onChange={(e) => {report.patientName = e.target.value}}
                />
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-last-name'
                    label='Patient Surname'
                    placeholder='Patient Surname'
                    defaultValue = {report.patientSurname}
                    onChange={(e) => {report.patientSurname = e.target.value}}
                />
                </Form.Group>
                <Form.Group widths='equal'>
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-first-name'
                    label='File No'
                    placeholder='File No'
                    defaultValue = {report.fileNo}
                    onChange={(e) => {report.fileNo = e.target.value}}
                />
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-last-name'
                    label='Identity Number'
                    placeholder='Identity Number'
                    defaultValue = {report.patientIdentityNumber}
                    onChange={(e) => {report.patientIdentityNumber = e.target.value}}
                />
                </Form.Group>
                <Form.Group widths='equal'>
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-first-name'
                    label='Diagnostic Title'
                    placeholder='Diagnostic Title'
                    defaultValue = {report.diagnosticTitle}
                    onChange={(e) => {report.diagnosticTitle = e.target.value}}
                />
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-last-name'
                    label='Diagnostic Details'
                    placeholder='Diagnostic Details'
                    defaultValue = {report.diagnosticDetail}
                    onChange={(e) => {report.diagnosticDetail = e.target.value}}
                />
                </Form.Group>
                <Form.Group widths='equal'>
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-first-name'
                    label='Report Date'
                    placeholder='Report Date'
                    defaultValue = {report.reportDate}
                    onChange={(e) => {report.reportDate = e.target.value}}
                />
                <Form.Field
                    control={Select}
                    label='Laborants'
                    placeholder = {`${report.laborantName} ${report.laborantSurname}`}
                    options = {laborantOptions}
                    search
                    onChange ={(e, data) => {report.laborantId = data.value}}
                />
                </Form.Group>
            </Form>
            <div>
                <button class="ui inverted green button" onClick={() => { createData(); navigate('/reports'); }}>Save</button>
            </div>
        </div>
    )
}