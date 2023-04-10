import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Form, Select } from 'semantic-ui-react'
import ReportService from '../services/ReportService';
import LaborantService from './../services/LaborantService';

export default function UpdateReport() {

    const [laborants, setLaborants] = useState([])
    const [isLoading, setLoading] = useState([])

    const navigate = useNavigate()
    const laborantService = new LaborantService()

    const reportService = new ReportService()

    let report = {
        "fileNo": '',
        "patientName": '',
        "patientSurname": '',
        "patientIdentityNumber": '',
        "diagnosticTitle": '',
        "diagnosticDetail": '',
        "reportDate": '',
        "laborantId": ''
    }

    useEffect(()=>{
        setTimeout(() => {
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
        reportService.addReport(jsonData);
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
                    onChange={(e) => {report.patientName = e.target.value}}
                />
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-last-name'
                    label='Patient Surname'
                    placeholder='Patient Surname'
                    onChange={(e) => {report.patientSurname = e.target.value}}
                />
                </Form.Group>
                <Form.Group widths='equal'>
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-first-name'
                    label='File No'
                    placeholder='File No'
                    onChange={(e) => {report.fileNo = e.target.value}}
                />
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-last-name'
                    label='Identity Number'
                    placeholder='Identity Number'
                    onChange={(e) => {report.patientIdentityNumber = e.target.value}}
                />
                </Form.Group>
                <Form.Group widths='equal'>
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-first-name'
                    label='Diagnostic Title'
                    placeholder='Diagnostic Title'
                    onChange={(e) => {report.diagnosticTitle = e.target.value}}
                />
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-last-name'
                    label='Diagnostic Details'
                    placeholder='Diagnostic Details'
                    onChange={(e) => {report.diagnosticDetail = e.target.value}}
                />
                </Form.Group>
                <Form.Group widths='equal'>
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-first-name'
                    label='Report Date'
                    placeholder='2023-04-10'
                    onChange={(e) => {report.reportDate = e.target.value}}
                />
                <Form.Field
                    control={Select}
                    label='Laborants'
                    placeholder = 'Choose a laborant'
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