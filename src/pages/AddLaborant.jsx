import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Grid } from 'semantic-ui-react'
import LaborantService from './../services/LaborantService';

export default function UpdateReport() {

    const navigate = useNavigate()
    const laborantService = new LaborantService()
    const [getError, setError] = useState(false)

    const [getLaborant, setLaborant] = useState({
        "laborantName": '',
        "laborantSurname": '',
        "laborantIdentityNumber": '',
        "hospitalIdentityNumber": '',
        "address": '',
        "phoneNumber": ''
    })

    const error =  getError !== false ?   
        <div class="ui negative message" style={{marginTop: '20px'}}>
            <div class="header">
                Error
            </div>
            {getError}
        </div>
        : 
    '';

    async function createData() {
        let jsonData = JSON.stringify(getLaborant)
        console.log(jsonData)
        try {
            await laborantService.addLaborant(jsonData).then(result => result.data)
            navigate("/laborants")
        } catch (error) {
            setError(error.response.data.message);
        }
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
                    onChange={(e) => setLaborant({...getLaborant, laborantName: e.target.value})}
                />
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-last-name'
                    label='Laborant Surname'
                    placeholder='Laborant Surname'
                    onChange={(e) => setLaborant({...getLaborant, laborantSurname: e.target.value})}
                />
                </Form.Group>
                <Form.Group widths='equal'>
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-first-name'
                    label='Laborant Identity Number'
                    placeholder='Laborant Identity Number'
                    onChange={(e) => setLaborant({...getLaborant, laborantIdentityNumber: e.target.value})}
                />
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-last-name'
                    label='Hospital Identity Number'
                    placeholder='Hospital Identity Number'
                    onChange={(e) => setLaborant({...getLaborant, hospitalIdentityNumber: e.target.value})}
                />
                </Form.Group>
                <Form.Group widths='equal'>
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-first-name'
                    label='Address'
                    placeholder='Address'
                    onChange={(e) => setLaborant({...getLaborant, address: e.target.value})}
                />
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-last-name'
                    label='Laborant Phone Number'
                    placeholder='Laborant Phone Number'
                    onChange={(e) => setLaborant({...getLaborant, phoneNumber: e.target.value})}
                />
                </Form.Group>
            </Form>
            <br/>
            <div>
                <Grid>
                    <Grid.Column textAlign="center">
                        <br/>
                       <button class="ui inverted green button" onClick={() => { createData(); }}>Save</button>
                    </Grid.Column>
                </Grid>
            </div>
            {error}
        </div>
    )
}