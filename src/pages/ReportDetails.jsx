import React, { useEffect, useState } from 'react'
import {useLocation, useParams, useNavigate} from 'react-router-dom';
import { Image, Item, Button, Segment, ButtonGroup, Grid } from 'semantic-ui-react'
import ReportService from './../services/ReportService'
import ImageService from '../services/ImageService';

export default function ReportDetails() {

    const [report, setReport] = useState([])
    const [isLoading, setLoading] = useState([])
    const [formData, setFormData] = useState([])
    //const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()
    const reportService = new ReportService()
    const imageService = new ImageService()
    
    useEffect(()=>{
        setTimeout(() => {
            reportService.getReportById(params.reportId).then(result => {setReport(result.data); setLoading(false);})
        }, 500)
    }, [])

    function updateReport(id){
        console.log(id);
        navigate(`/UpdateReport/${id}`, {state: {reportId: id,}})
    }

    function saveImage(reportId){
        imageService.addImage(formData, reportId)
    }

    function refreshPage(){
        window.location.reload(false)
    }

    function deleteImage(imageId){
        imageService.deleteImage(imageId)
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
            <Grid>
                <Grid.Row textAlign='center'>
                    <Grid.Column>
                        <div class="ui massive message">{report.patientName} {report.patientSurname}</div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Segment>
                <Grid columns='equal' divided>
                    <Grid.Row textAlign='center'>
                        <Grid.Column><b>Id:</b></Grid.Column>
                        <Grid.Column><b>{report.id}</b></Grid.Column>
                    </Grid.Row>
                    <Grid.Row textAlign='center'>
                        <Grid.Column><b>File No:</b></Grid.Column>
                        <Grid.Column><b>{report.fileNo}</b></Grid.Column>
                    </Grid.Row>
                    <Grid.Row textAlign='center'>
                        <Grid.Column><b>Patient Name:</b></Grid.Column>
                        <Grid.Column><b>{report.patientName}</b></Grid.Column>
                    </Grid.Row>
                    <Grid.Row textAlign='center'>
                        <Grid.Column><b>Patient Surname:</b></Grid.Column>
                        <Grid.Column><b>{report.patientSurname}</b></Grid.Column>
                    </Grid.Row>
                    <Grid.Row textAlign='center'>
                        <Grid.Column><b>Patient Identity Number:</b></Grid.Column>
                        <Grid.Column><b>{report.patientIdentityNumber}</b></Grid.Column>
                    </Grid.Row>
                    <Grid.Row textAlign='center'>
                        <Grid.Column><b>Diagnostic Title:</b></Grid.Column>
                        <Grid.Column><b>{report.diagnosticTitle}</b></Grid.Column>
                    </Grid.Row>
                    <Grid.Row textAlign='center'>
                        <Grid.Column><b>Diagnostic Detail:</b></Grid.Column>
                        <Grid.Column><b>{report.diagnosticDetail}</b></Grid.Column>
                    </Grid.Row>
                    <Grid.Row textAlign='center'>
                        <Grid.Column><b>Report Date:</b></Grid.Column>
                        <Grid.Column><b>{report.reportDate}</b></Grid.Column>
                    </Grid.Row>
                    <Grid.Row textAlign='center'>
                        <Grid.Column><b>Laborant Name:</b></Grid.Column>
                        <Grid.Column><b>{report.laborantName}</b></Grid.Column>
                    </Grid.Row>
                    <Grid.Row textAlign='center'>
                        <Grid.Column><b>Laborant Surname:</b></Grid.Column>
                        <Grid.Column><b>{report.laborantSurname}</b></Grid.Column>
                    </Grid.Row>
                    <Grid.Row textAlign='center'>
                        <Grid.Column><b>Laborant Address:</b></Grid.Column>
                        <Grid.Column><b>{report.laborantAddress}</b></Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
            <br/>
            <div>
                <ButtonGroup>
                    <Button style={{marginRight: '5px'}} inverted color='red' onClick={() => {reportService.deleteReportById(report.id); navigate('/reports'); }}>Delete Report</Button>
                    <Button inverted color='yellow' onClick={() => updateReport(report.id)}>Update Report</Button>
                </ButtonGroup> 
            </div>
            <br/>
            <Segment clearing color='teal'>
                <b>Add Image </b>
                <input type="file" onChange={ addImage }/>
                <Button inverted color='green' floated='right' onClick={() => {saveImage(report.id); refreshPage();} } >Save Image</Button>
            </Segment>
            <br/>
            <Grid columns={3} divided>
                {
                    report.images.map((image => (
                        <Grid.Column width={5}>
                            <Item.Group>
                                <Item>
                                    <Item.Content>
                                        <Item.Header as='a'><b>Image Name:</b> {image.imageName}</Item.Header>
                                        <Item.Description>
                                            <Image src={`data:image/png;base64, ${image.imageData}`} />
                                        </Item.Description>
                                        <Item.Extra><b>Image Type</b> {image.imageType}</Item.Extra>
                                        <Button inverted color='red' floated='right' onClick={() => { deleteImage(image.id); refreshPage();}}> Delete Image </Button>
                                    </Item.Content>
                                </Item>
                            </Item.Group>
                        </Grid.Column>
                    )))
                }
            </Grid>
            <br/>
        </div>
    )
}