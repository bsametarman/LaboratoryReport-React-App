import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Grid } from 'semantic-ui-react'
import LaborantService from './../services/LaborantService'

export default function UpdateLaborant() {

    const [laborant, setLaborant] = useState([])
    const [isLoading, setLoading] = useState([])

    //const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()
    const laborantService = new LaborantService()

    useEffect(()=>{
        setTimeout(() => {
            laborantService.getLaborantById(params.laborantId).then(result => {setLaborant(result.data); setLoading(false);})
        }, 500)
    }, [])

    function createData() {
        let jsonData = {
            "id": laborant.id,
            "laborantName": laborant.laborantName,
            "laborantSurname": laborant.laborantSurname,
            "laborantIdentityNumber": laborant.laborantIdentityNumber,
            "hospitalIdentityNumber": laborant.hospitalIdentityNumber,
            "address": laborant.address,
            "phoneNumber": laborant.phoneNumber
        }
        jsonData = JSON.stringify(jsonData)
        console.log(jsonData)
        laborantService.updateLaborantById(jsonData);
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
                        label='Laborant Name'
                        placeholder='Laborant Name'
                        defaultValue = {laborant.laborantName}
                        onChange={(e) => {laborant.laborantName = e.target.value}}
                    />
                    <Form.Input
                        fluid
                        id='form-subcomponent-shorthand-input-last-name'
                        label='Laborant Surname'
                        placeholder='Laborant Surname'
                        defaultValue = {laborant.laborantSurname}
                        onChange={(e) => {laborant.laborantSurname = e.target.value}}
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input
                        fluid
                        id='form-subcomponent-shorthand-input-first-name'
                        label='Laborant Identity Number'
                        placeholder='Laborant Identity Number'
                        defaultValue = {laborant.laborantIdentityNumber}
                        onChange={(e) => {laborant.laborantIdentityNumber = e.target.value}}
                    />
                    <Form.Input
                        fluid
                        id='form-subcomponent-shorthand-input-last-name'
                        label='Hospital Identity Number'
                        placeholder='Hospital Identity Number'
                        defaultValue = {laborant.hospitalIdentityNumber}
                        onChange={(e) => {laborant.hospitalIdentityNumber = e.target.value}}
                />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input
                        fluid
                        id='form-subcomponent-shorthand-input-first-name'
                        label='Laborant Address'
                        placeholder='laborant Address'
                        defaultValue = {laborant.address}
                        onChange={(e) => {laborant.address = e.target.value}}
                    />
                    <Form.Input
                        fluid
                        id='form-subcomponent-shorthand-input-last-name'
                        label='Laborant Phone Number'
                        placeholder='5554443322'
                        defaultValue = {laborant.phoneNumber}
                        onChange={(e) => {laborant.phoneNumber = e.target.value}}
                    />
                </Form.Group>
            </Form>
            <Grid container>
                <Grid.Row>
                    <Grid.Column style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Button inverted color='green' floated='center' onClick={() => { createData(); navigate('/laborants'); }}>Save</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}