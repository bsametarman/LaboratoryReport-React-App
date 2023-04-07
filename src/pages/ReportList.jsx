import React, { useEffect, useState } from 'react'
import { Icon, Menu, Table } from 'semantic-ui-react'
import ReportService from './../services/ReportService';

export default function ReportList() {
    
    const [reports, setReports] = useState([])
    
    useEffect(()=>{
        let reportService = new ReportService()
        reportService.getReports().then(result => setReports(result.data))
    })

    return (
        <div>
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