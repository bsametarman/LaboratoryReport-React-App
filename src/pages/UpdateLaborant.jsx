import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Button, Grid } from 'semantic-ui-react'
import LaborantService from './../services/LaborantService'

export default function UpdateLaborant() {

    const [getLaborant, setLaborant] = useState({
        "laborantName": '',
        "laborantSurname": '',
        "laborantIdentityNumber": '',
        "hospitalIdentityNumber": '',
        "address": '',
        "phoneNumber": ''
    })
    const [isLoading, setLoading] = useState([])
    const [getError, setError] = useState(false)

    //const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()
    const laborantService = new LaborantService()

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
            laborantService.getLaborantById(params.laborantId).then(result => {setLaborant(result.data.data); setLoading(false);})
        }, 500)
    }, [])

    async function createData() {
        let jsonData = JSON.stringify(getLaborant)
        //console.log(jsonData)
        try {
            await laborantService.updateLaborantById(jsonData);
            navigate('/laborants')
        } catch (error) {
            setError(error.response.data.message);
        }
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
                        defaultValue = {getLaborant.laborantName}
                        onChange={(e) => setLaborant({...getLaborant, laborantName: e.target.value})}
                    />
                    <Form.Input
                        fluid
                        id='form-subcomponent-shorthand-input-last-name'
                        label='Laborant Surname'
                        placeholder='Laborant Surname'
                        defaultValue = {getLaborant.laborantSurname}
                        onChange={(e) => setLaborant({...getLaborant, laborantSurname: e.target.value})}
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input
                        fluid
                        id='form-subcomponent-shorthand-input-first-name'
                        label='Laborant Identity Number'
                        placeholder='Laborant Identity Number'
                        defaultValue = {getLaborant.laborantIdentityNumber}
                        onChange={(e) => setLaborant({...getLaborant, laborantIdentityNumber: e.target.value})}
                    />
                    <Form.Input
                        fluid
                        id='form-subcomponent-shorthand-input-last-name'
                        label='Hospital Identity Number'
                        placeholder='Hospital Identity Number'
                        defaultValue = {getLaborant.hospitalIdentityNumber}
                        onChange={(e) => setLaborant({...getLaborant, hospitalIdentityNumber: e.target.value})}
                />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input
                        fluid
                        id='form-subcomponent-shorthand-input-first-name'
                        label='Laborant Address'
                        placeholder='laborant Address'
                        defaultValue = {getLaborant.address}
                        onChange={(e) => setLaborant({...getLaborant, address: e.target.value})}
                    />
                    <Form.Input
                        fluid
                        id='form-subcomponent-shorthand-input-last-name'
                        label='Laborant Phone Number'
                        placeholder='5554443322'
                        defaultValue = {getLaborant.phoneNumber}
                        onChange={(e) => setLaborant({...getLaborant, phoneNumber: e.target.value})}
                    />
                </Form.Group>
            </Form>
            <Grid container>
                <Grid.Row>
                    <Grid.Column style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Button inverted color='green' floated='center' onClick={() => { createData() }}>Save</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            {error}
        </div>
    )
}