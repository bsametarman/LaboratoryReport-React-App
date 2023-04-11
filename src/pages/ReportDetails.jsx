import React, { useEffect, useState } from 'react'
import {useLocation, useParams, useNavigate} from 'react-router-dom';
import { Image, Item } from 'semantic-ui-react'
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
            <div class="column">
                <table class="ui center aligned table">
                <tbody>
                    <tr>
                        <td class="center"><b>Id:</b></td>
                        <td class="center">{report.id}</td>
                    </tr>
                    <tr>
                        <td class="center"><b>File No:</b></td>
                        <td class="center">{report.fileNo}</td>
                    </tr>
                    <tr>
                        <td class="center"><b>Patient Name:</b></td>
                        <td class="center">{report.patientName}</td>
                    </tr>
                    <tr>
                        <td class="center"><b>Patient Surname:</b></td>
                        <td class="center">{report.patientSurname}</td>
                    </tr>
                    <tr>
                        <td class="center"><b>Patient Identity Number:</b></td>
                        <td class="center">{report.patientIdentityNumber}</td>
                    </tr>
                    <tr>
                        <td class="center"><b>Diagnostic Title:</b></td>
                        <td class="center">{report.diagnosticTitle}</td>
                    </tr>
                    <tr>
                        <td class="center"><b>Diagnostic Detail:</b></td>
                        <td class="center">{report.diagnosticDetail}</td>
                    </tr>
                    <tr>
                        <td class="center"><b>Report Date:</b></td>
                        <td class="center">{report.reportDate}</td>
                    </tr>
                    <tr>
                        <td class="center"><b>Laborant Name:</b></td>
                        <td class="center">{report.laborantName}</td>
                    </tr>
                    <tr>
                        <td class="center"><b>Laborant Surname:</b></td>
                        <td class="center">{report.laborantSurname}</td>
                    </tr>
                    <tr>
                        <td class="center"><b>Laborant Address:</b></td>
                        <td class="center">{report.laborantAddress}</td>
                    </tr>
                </tbody>
                </table>
            </div>
            <br/>
            <div>
                <button class="ui inverted red button" onClick={() => {reportService.deleteReportById(report.id); navigate('/reports'); }} >Delete</button>
                <button class="ui inverted yellow button" onClick={() => updateReport(report.id)} >Update</button>  
            </div>
            <div class="ui fluid segment">
                <b>Add Image </b>
                <input type="file" onChange={ addImage }/>
                <button class="ui inverted green button" onClick={() => {saveImage(report.id); refreshPage();} } >Save</button>
            </div>
            <br/>
            <div id='images' class='center' style={{width:'800px', margin:'0 auto'}}>
            {
              
              report.images.map((image => (
                <Item.Group>
                    <Item>
                    <Item.Content>
                        <Item.Header as='a'><b>Image Name:</b> {image.imageName}</Item.Header>
                        <Item.Description>
                            <Image src={`data:image/png;base64, ${image.imageData}`} />
                        </Item.Description>
                        <Item.Extra><b>Image Type</b> {image.imageType}</Item.Extra>
                    </Item.Content>
                    </Item>
                </Item.Group>
                )))
            }
                
            </div>
        </div>
    )

}