import React, { useEffect, useState } from 'react'
import { useParams, useNavigate} from 'react-router-dom';
import { Button, Segment, ButtonGroup, Grid } from 'semantic-ui-react'
import LaborantService from './../services/LaborantService'

export default function LaborantDetails() {

    const [laborant, setLaborant] = useState([])
    const [isLoading, setLoading] = useState([])
    //const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()
    const laborantService = new LaborantService()
    
    useEffect(()=>{
        setTimeout(() => {
            laborantService.getLaborantById(params.laborantId).then(result => {setLaborant(result.data.data); setLoading(false);})
        }, 500)
    }, [])

    function updateLaborant(id){
        console.log(id);
        navigate(`/UpdateLaborant/${id}`, {state: {laborantId: id,}})
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
                        <div class="ui massive message">{laborant.laborantName} {laborant.laborantSurname}</div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Segment>
                <Grid columns='equal' divided>
                    <Grid.Row textAlign='center'>
                        <Grid.Column><b>Id:</b></Grid.Column>
                        <Grid.Column><b>{laborant.id}</b></Grid.Column>
                    </Grid.Row>
                    <Grid.Row textAlign='center'>
                        <Grid.Column><b>Laborant Name:</b></Grid.Column>
                        <Grid.Column><b>{laborant.laborantName}</b></Grid.Column>
                    </Grid.Row>
                    <Grid.Row textAlign='center'>
                        <Grid.Column><b>Laborant Surname:</b></Grid.Column>
                        <Grid.Column><b>{laborant.laborantSurname}</b></Grid.Column>
                    </Grid.Row>
                    <Grid.Row textAlign='center'>
                        <Grid.Column><b>Laborant Identity Number:</b></Grid.Column>
                        <Grid.Column><b>{laborant.laborantIdentityNumber}</b></Grid.Column>
                    </Grid.Row>
                    <Grid.Row textAlign='center'>
                        <Grid.Column><b>Hospital Identity Number:</b></Grid.Column>
                        <Grid.Column><b>{laborant.hospitalIdentityNumber}</b></Grid.Column>
                    </Grid.Row>
                    <Grid.Row textAlign='center'>
                        <Grid.Column><b>Laborant Address:</b></Grid.Column>
                        <Grid.Column><b>{laborant.address}</b></Grid.Column>
                    </Grid.Row>
                    <Grid.Row textAlign='center'>
                        <Grid.Column><b>Laborant Phone Number:</b></Grid.Column>
                        <Grid.Column><b>{laborant.phoneNumber}</b></Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
            <br/>
            <div>
                <ButtonGroup>
                    <Button style={{marginRight: '5px'}} inverted color='red' onClick={() => {laborantService.deleteLaborantById(laborant.id); navigate('/laborants'); }}>Delete Laborant</Button>
                    <Button inverted color='yellow' onClick={() => updateLaborant(laborant.id)}>Update Laborant</Button>
                </ButtonGroup> 
            </div>
            <br/>
            <br/>
        </div>
    )
}