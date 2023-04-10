import React, { useEffect, useState } from 'react'
import { Icon, Menu, Table } from 'semantic-ui-react'
import { useNavigate } from "react-router-dom";
import ReportService from './../services/ReportService'

export default function ReportList() {
    
    const [reports, setReports] = useState([])
    const navigate = useNavigate();
    
    useEffect(()=>{
        let reportService = new ReportService()
        reportService.getReports().then(result => setReports(result.data))
    })

    function getDetails(id){
        console.log(id);
        navigate(`/ReportDetails/${id}`, {state: {reportId: id,}})
    }

    return (
        <div style={{marginLeft: '50px', marginTop: '100px', marginRight: '50px'}}>
            <div>
                <button class="ui inverted green button" onClick={() => navigate("/AddReport")}>Add Report</button>
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
                            <button class="ui inverted green button" onClick={() => getDetails(report.id)}>Detail</button>
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