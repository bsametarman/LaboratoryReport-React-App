import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Form, Select, Grid } from 'semantic-ui-react'
import ReportService from '../services/ReportService';
import LaborantService from './../services/LaborantService';
import ImageService from '../services/ImageService';

export default function UpdateReport() {

    const [laborants, setLaborants] = useState([])
    const [isLoading, setLoading] = useState([])
    const [formData, setFormData] = useState()
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
    let [getError, setError] = useState(false)

    const navigate = useNavigate()
    const laborantService = new LaborantService()
    const reportService = new ReportService()
    const imageService = new ImageService()

    let addedReport;
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
            laborantService.getAllLaborants().then(result => {setLaborants(result.data.data); setLoading(false);})
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
            addedReport = await reportService.addReport(jsonData).then(result => result.data)
            imageService.addImage(formData, addedReport.data.id)
            navigate("/reports")

        } catch (error) {
            setError(error.response.data.message);
        }
    }

    const addImage = async (event) => {
        const formData = new FormData()
        setFormData(formData)
        formData.append("image", event.target.files[0])
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
                    onChange={(e) => setReport({...getReport, patientName: e.target.value})}
                />
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-last-name'
                    label='Patient Surname'
                    placeholder='Patient Surname'
                    onChange={(e) => setReport({...getReport, patientSurname: e.target.value})}
                />
                </Form.Group>
                <Form.Group widths='equal'>
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-first-name'
                    label='File No'
                    placeholder='File No'
                    onChange={(e) => setReport({...getReport, fileNo: e.target.value})}
                />
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-last-name'
                    label='Identity Number'
                    placeholder='Identity Number'
                    onChange={(e) => setReport({...getReport, patientIdentityNumber: e.target.value})}
                />
                </Form.Group>
                <Form.Group widths='equal'>
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-first-name'
                    label='Diagnostic Title'
                    placeholder='Diagnostic Title'
                    onChange={(e) => setReport({...getReport, diagnosticTitle: e.target.value})}
                />
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-last-name'
                    label='Diagnostic Details'
                    placeholder='Diagnostic Details'
                    onChange={(e) => setReport({...getReport, diagnosticDetail: e.target.value})}
                />
                </Form.Group>
                <Form.Group widths='equal'>
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-first-name'
                    label='Report Date'
                    placeholder='2023-04-10'
                    onChange={(e) => setReport({...getReport, reportDate: e.target.value})}
                />
                <Form.Field
                    control={Select}
                    label='Laborants'
                    placeholder = 'Choose a laborant'
                    options = {laborantOptions}
                    search
                    onChange ={(e, data) => setReport({...getReport, laborantId: data.value})}
                />
                </Form.Group>
            </Form>
            <br/>
            <div class="ui middle aligned center aligned grid container">
                <div class="ui middle aligned center aligned grid container">Add Image</div>
                <div class="ui fluid segment">
                    <input type="file" onChange={ addImage }/>
                </div>
            </div>
            <div>
                <Grid>
                    <Grid.Column textAlign="center">
                        <br/>
                       <button class="ui inverted green button" onClick={() => { createData(); }}>Save</button>
                    </Grid.Column>
                </Grid>
            </div>
            {error}
        </div>
    )
}