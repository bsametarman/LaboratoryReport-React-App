import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Grid, Button, Divider, Segment, Icon } from 'semantic-ui-react'

export default function Home() {

    const navigate = useNavigate()

    const titleStyle = {
        fontSize: 24,
        textAlign: "center",
        marginTop: "150px",
    }

    const textStyle = {
        fontSize: 20,
        marginTop: 50,
        marginBottom: 50
    }

    return (
        <Container>
            <div class="column twelve wide">
                <div style={titleStyle}>
                    Welcome to the laboratory report system. <br/> <br/>
                    Track reports and laborants easly.
                </div>
            </div>
            <Segment color='teal' style={{marginTop: '100px'}}>
                <Grid divided='vertically'>
                    <Grid.Row columns={2} textAlign='center'>
                        <Grid.Column>
                            <div style={textStyle}>
                                Click to see reports!
                            </div>
                            <div>
                                <Icon enabled name='angle double down' size='huge' style={{marginBottom: '30px'}}/>
                            </div>
                            <Button inverted color='violet' size='big' onClick={() => {navigate("/reports"); }}>Reports</Button>
                        </Grid.Column>
                        <Grid.Column>
                            <div style={textStyle}>
                                Click to see laborants!
                            </div>
                            <div>
                                <Icon enabled name='angle double down' size='huge' style={{marginBottom: '30px'}}/>
                            </div>
                            <Button inverted color='violet' size='big' onClick={() => {navigate("/laborants"); }}>Laborants</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Divider vertical>|</Divider>
            </Segment>
        </Container>
    )
}