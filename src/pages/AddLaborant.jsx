import { useNavigate } from 'react-router-dom';
import { Form, Grid } from 'semantic-ui-react'
import LaborantService from './../services/LaborantService';

export default function UpdateReport() {

    const navigate = useNavigate()
    const laborantService = new LaborantService()

    let laborant = {
        "laborantName": '',
        "laborantSurname": '',
        "laborantIdentityNumber": '',
        "hospitalIdentityNumber": '',
        "address": '',
        "phoneNumber": ''
    }

    async function createData() {
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
        laborantService.addLaborant(jsonData).then(result => result.data)
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
                    onChange={(e) => {laborant.laborantName = e.target.value}}
                />
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-last-name'
                    label='Laborant Surname'
                    placeholder='Laborant Surname'
                    onChange={(e) => {laborant.laborantSurname = e.target.value}}
                />
                </Form.Group>
                <Form.Group widths='equal'>
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-first-name'
                    label='Laborant Identity Number'
                    placeholder='Laborant Identity Number'
                    onChange={(e) => {laborant.laborantIdentityNumber = e.target.value}}
                />
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-last-name'
                    label='Hospital Identity Number'
                    placeholder='Hospital Identity Number'
                    onChange={(e) => {laborant.hospitalIdentityNumber = e.target.value}}
                />
                </Form.Group>
                <Form.Group widths='equal'>
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-first-name'
                    label='Address'
                    placeholder='Address'
                    onChange={(e) => {laborant.address = e.target.value}}
                />
                <Form.Input
                    fluid
                    id='form-subcomponent-shorthand-input-last-name'
                    label='Laborant Phone Number'
                    placeholder='Laborant Phone Number'
                    onChange={(e) => {laborant.phoneNumber = e.target.value}}
                />
                </Form.Group>
            </Form>
            <br/>
            <div>
                <Grid>
                    <Grid.Column textAlign="center">
                        <br/>
                       <button class="ui inverted green button" onClick={() => { createData(); navigate("/laborants") }}>Save</button>
                    </Grid.Column>
                </Grid>
            </div>
        </div>
    )
}