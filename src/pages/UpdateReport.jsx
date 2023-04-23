import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Select, Button, Grid } from 'semantic-ui-react'
import ReportService from './../services/ReportService'
import LaborantService from './../services/LaborantService';

export default function UpdateReport() {

    const [getReport, setReport] = useState({
        "fileNo": '',
        "patientName": '',
        "patientSurname": '',
        "patientIdentityNumber": '',
        "diagnosticTitle": '',
        "diagnosticDetail": '',
        "reportDate": '',
        "laborantId": ''
    })
    const [laborants, setLaborants] = useState([])
    const [isLoading, setLoading] = useState([])
    let [getError, setError] = useState(false)

    //const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()
    const reportService = new ReportService()
    const laborantService = new LaborantService()

    const error =  getError !== false ?   
        <div class="ui negative message" style={{marginTop: '20px'}}>
            <div class="header">
                Error
            </div>
            {getError}
        </div>
        : 
        '';

    useEffect(()=>{
        setTimeout(() => {
            reportService.getReportById(params.reportId).then(result => {setReport(result.data.data)})
            laborantService.getAllActiveLaborants().then(result => {setLaborants(result.data.data); setLoading(false);})
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

    async function createData() {
        let jsonData = JSON.stringify(getReport)
        try {
            await reportService.updateReportById(jsonData);
            navigate('/reports');
        } catch (error) {
            setError(error.response.data.message);
        }
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
                    defaultValue = {getReport.patientName}
                    onChange={(e) => setReport({...getReport, patientName: e.target.value})}
                />
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-last-name'
                    label='Patient Surname'
                    placeholder='Patient Surname'
                    defaultValue = {getReport.patientSurname}
                    onChange={(e) => setReport({...getReport, patientSurname: e.target.value})}
                />
                </Form.Group>
                <Form.Group widths='equal'>
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-first-name'
                    label='File No'
                    placeholder='File No'
                    defaultValue = {getReport.fileNo}
                    onChange={(e) => setReport({...getReport, fileNo: e.target.value})}
                />
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-last-name'
                    label='Identity Number'
                    placeholder='Identity Number'
                    defaultValue = {getReport.patientIdentityNumber}
                    onChange={(e) => setReport({...getReport, patientIdentityNumber: e.target.value})}
                />
                </Form.Group>
                <Form.Group widths='equal'>
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-first-name'
                    label='Diagnostic Title'
                    placeholder='Diagnostic Title'
                    defaultValue = {getReport.diagnosticTitle}
                    onChange={(e) => setReport({...getReport, diagnosticTitle: e.target.value})}
                />
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-last-name'
                    label='Diagnostic Details'
                    placeholder='Diagnostic Details'
                    defaultValue = {getReport.diagnosticDetail}
                    onChange={(e) => setReport({...getReport, diagnosticDetail: e.target.value})}
                />
                </Form.Group>
                <Form.Group widths='equal'>
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-first-name'
                    label='Report Date'
                    placeholder='Report Date'
                    defaultValue = {getReport.reportDate}
                    onChange={(e) => setReport({...getReport, reportDate: e.target.value})}
                />
                <Form.Field
                    control={Select}
                    label='Laborants'
                    placeholder = {`${getReport.laborantName} ${getReport.laborantSurname}`}
                    options = {laborantOptions}
                    search
                    onChange ={(e, data) => {getReport.laborantId = data.value}}
                />
                </Form.Group>
            </Form>
            <Grid container>
                <Grid.Row>
                    <Grid.Column style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Button inverted color='green' floated='center' onClick={() => { createData() }}>Save</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            {error}
        </div>
    )
}