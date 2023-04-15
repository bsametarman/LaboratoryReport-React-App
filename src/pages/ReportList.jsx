import React, { useEffect, useState } from 'react'
import { Icon, Menu, Table, Button, ButtonGroup } from 'semantic-ui-react'
import { useNavigate } from "react-router-dom";
import ReportService from './../services/ReportService'

export default function ReportList() {
    
    const [reports, setReports] = useState([])
    const [isLoading, setLoading] = useState([])
    const navigate = useNavigate();
    const reportService = new ReportService()

    useEffect(()=>{
        setTimeout(() => {
            reportService.getReports().then(result =>  {setReports(result.data.data); setLoading(false);})
        }, 500)
    })

    function getDetails(id){
        console.log(id);
        navigate(`/ReportDetails/${id}`, {state: {reportId: id,}})
    }

    if(isLoading){
        return (
            <div style={{margin: '100px'}}>Loading...</div>
        );
    }

    return (
        <div style={{marginLeft: '50px', marginTop: '100px', marginRight: '50px'}}>
            <div>
                <Button inverted color='green' onClick={() => navigate("/AddReport")}>Add Report</Button>
            </div>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>File No</Table.HeaderCell>
                        <Table.HeaderCell>Patient Name</Table.HeaderCell>
                        <Table.HeaderCell>Patient Surname</Table.HeaderCell>
                        <Table.HeaderCell>Patient Identity Number</Table.HeaderCell>
                        <Table.HeaderCell>Diagnostic Title</Table.HeaderCell>
                        <Table.HeaderCell>Diagnostic Detail</Table.HeaderCell>
                        <Table.HeaderCell>Report Date</Table.HeaderCell>
                        <Table.HeaderCell>Laborant Name</Table.HeaderCell>
                        <Table.HeaderCell>Laborant Surname</Table.HeaderCell>
                        <Table.HeaderCell>Laborant Address</Table.HeaderCell>
                        <Table.HeaderCell>Detail</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {reports.map((report=>(
                        <Table.Row>
                        <Table.Cell>{report.id}</Table.Cell>
                        <Table.Cell>{report.fileNo}</Table.Cell>
                        <Table.Cell>{report.patientName}</Table.Cell>
                        <Table.Cell>{report.patientSurname}</Table.Cell>
                        <Table.Cell>{report.patientIdentityNumber}</Table.Cell>
                        <Table.Cell>{report.diagnosticTitle}</Table.Cell>
                        <Table.Cell>{report.diagnosticDetail}</Table.Cell>
                        <Table.Cell>{report.reportDate}</Table.Cell>
                        <Table.Cell>{report.laborantName}</Table.Cell>
                        <Table.Cell>{report.laborantSurname}</Table.Cell>
                        <Table.Cell>{report.laborantAddress}</Table.Cell>
                        <Table.Cell>
                            <ButtonGroup>
                                <Button style={{marginRight: '5px'}} inverted color='green' onClick={() => getDetails(report.id)}>Detail</Button>
                                <Button inverted color='red' onClick={() => { reportService.deleteReportById(report.id); }} > Delete</Button>
                            </ButtonGroup>
                        </Table.Cell>
                    </Table.Row>
                    )))}
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='3'>
                            <Menu floated='right' pagination>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron left' />
                                </Menu.Item>
                                <Menu.Item as='a'>1</Menu.Item>
                                <Menu.Item as='a'>2</Menu.Item>
                                <Menu.Item as='a'>3</Menu.Item>
                                <Menu.Item as='a'>4</Menu.Item>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron right' />
                                </Menu.Item>
                            </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </div>
    )
}