import React, { useEffect, useState } from 'react'
import { Icon, Menu, Table, Button, ButtonGroup } from 'semantic-ui-react'
import { useNavigate } from "react-router-dom";
import LaborantService from './../services/LaborantService'

export default function LaborantList() {
    
    const [laborants, setLaborants] = useState([])
    const [isLoading, setLoading] = useState([])
    const navigate = useNavigate();
    const laborantService = new LaborantService()

    useEffect(()=>{
        setTimeout(() => {
            laborantService.getAllLaborants().then(result =>  {setLaborants(result.data.data); setLoading(false);})
        }, 500)
    })

    function getDetails(id){
        console.log(id);
        navigate(`/LaborantDetails/${id}`, {state: {laborantId: id,}})
    }

    if(isLoading){
        return (
            <div style={{margin: '100px'}}>Loading...</div>
        );
    }

    return (
        <div style={{marginLeft: '50px', marginTop: '100px', marginRight: '50px'}}>
            <div>
                <Button inverted color='green' onClick={() => navigate("/AddLaborant")}>Add Laborant</Button>
            </div>
            <Table celled color='teal'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>Laborant Name</Table.HeaderCell>
                        <Table.HeaderCell>Laborant Surname</Table.HeaderCell>
                        <Table.HeaderCell>Laborant Identity Number</Table.HeaderCell>
                        <Table.HeaderCell>Hospital Identity Number</Table.HeaderCell>
                        <Table.HeaderCell>Laborant Address</Table.HeaderCell>
                        <Table.HeaderCell>Laborant Phone Number</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {laborants.map((laborant=>(
                        <Table.Row>
                        <Table.Cell>{laborant.id}</Table.Cell>
                        <Table.Cell>{laborant.laborantName}</Table.Cell>
                        <Table.Cell>{laborant.laborantSurname}</Table.Cell>
                        <Table.Cell>{laborant.laborantIdentityNumber}</Table.Cell>
                        <Table.Cell>{laborant.hospitalIdentityNumber}</Table.Cell>
                        <Table.Cell>{laborant.address}</Table.Cell>
                        <Table.Cell>{laborant.phoneNumber}</Table.Cell>
                        <Table.Cell>
                            <ButtonGroup>
                                <Button style={{marginRight: '5px'}} inverted color='green' onClick={() => getDetails(laborant.id)}>Detail</Button>
                                <Button inverted color='red' onClick={() => { laborantService.deleteLaborantById(laborant.id); }} > Delete</Button>
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