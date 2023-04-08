import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom';
import { Image, Item } from 'semantic-ui-react'
import ReportService from './../services/ReportService'

export default function ReportDetails() {

    const [report, setReport] = useState([])
    const [isLoading, setLoading] = useState([])
    const location = useLocation()
    
    useEffect(()=>{
        setTimeout(() => {
            let reportService = new ReportService()
            reportService.getReportById(location.state.reportId).then(result => {setReport(result.data); setLoading(false);})
        }, 500)
    }, [])
    console.log(report.images)

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