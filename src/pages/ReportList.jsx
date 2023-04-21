import React, { useEffect, useState } from 'react'
import { Icon, Menu, Table, Button, ButtonGroup, Grid } from 'semantic-ui-react'
import { useNavigate } from "react-router-dom";
import ReportService from './../services/ReportService'

export default function ReportList() {
    
    const [reports, setReports] = useState([])
    const [isLoading, setLoading] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredReports, setFilteredReports] = useState([])
    const navigate = useNavigate()
    const reportService = new ReportService()

    useEffect(()=>{
        setTimeout(() => {
           reportService.getActiveReports().then(result =>  {setReports(result.data.data); setLoading(false); setFilteredReports(result.data.data)})
        }, 500)
    }, [])
    
    const handleChange = e => {
        setSearchQuery(e.target.value)
    }

    useEffect(() => {
        let results = reports.filter(report => (
            String(report.patientName + " " + report.patientSurname).toLowerCase().includes(searchQuery)
        ))
        setFilteredReports(results)
    }, [searchQuery])


    function getDetails(id){
        console.log(id);
        navigate(`/ReportDetails/${id}`, {state: {reportId: id,}})
    }

    function listDesc(){
        reportService.getActiveReportsDesc().then(reports => {setFilteredReports(reports.data.data)})
    }

    function listAsc(){
        reportService.getActiveReportsAsc().then(reports => {setFilteredReports(reports.data.data)})
    }

    if(isLoading){
        return (
            <div style={{margin: '100px'}}>Loading...</div>
        );
    }

    return (
        <div style={{marginLeft: '50px', marginTop: '100px', marginRight: '50px'}}>
            <Grid>
                <Grid.Column>
                    <Button inverted color='green' onClick={() => navigate("/AddReport")}>Add Report</Button>
                </Grid.Column>
                <Grid.Column width={2} floated='right' style={{display: 'inline-block'}}>
                    <div class="ui search">
                        <div class="ui icon input">
                            <input class="prompt" type="text" placeholder="Search..." onChange={handleChange}/>
                            <i class="search icon"></i>
                        </div>
                    </div>
                </Grid.Column>
            </Grid>
            <Grid>
                <Grid.Column>
                    <Button.Group floated='right'>
                        <Button style={{marginRight: '5px'}} inverted color='violet' onClick={ listDesc } >List Desc</Button>
                        <Button inverted color='violet' onClick={ listAsc } >List Asc</Button>
                    </Button.Group>
                </Grid.Column>
            </Grid>
            <Table celled color='yellow'>
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
                    {filteredReports.map((report=>(
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
                                    <Button inverted color='red' onClick={() => { reportService.changeActiveState(report.id); window.location.reload(false); }} > Delete</Button>
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