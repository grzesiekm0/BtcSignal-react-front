import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

import UserService from "../services/user.service";

export class AddDepModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        /*fetch(process.env.REACT_APP_API+'alert',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                //AlertId:null,
                userId:event.target.userId.valueAsNumber,               
                exchange:event.target.exchange.value,
                course:event.target.course.value,
                currency:event.target.currency.value,
                status:event.target.status.valueAsNumber
                             
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })*/

        UserService.addAlerts(
            
            event.target.userId.valueAsNumber,
            event.target.exchange.value,
            event.target.course.value,
            event.target.status.valueAsNumber,
            event.target.currency.value 
            
            //JSON.stringify({
                //AlertId:null,
              //  userId:event.target.userId.valueAsNumber,               
               // exchange:event.target.exchange.value,
               // course:event.target.course.value,
               // currency:event.target.currency.value,
               // status:event.target.status.valueAsNumber                 
            //})             
        ).then(
      response => {
        this.setState({
          deps: response.data
          //deps:data
        });
        window.location.reload(false);
      },
      error => {
        this.setState({
          deps:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
    }
    render(){
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Add Department
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="serId">
                        <Form.Label>Uzytkownik</Form.Label>
                        <Form.Control type="number" name="userId" required 
                        placeholder="Który użytkownik"/>                        
                    </Form.Group>

                    <Form.Group controlId="exchange">
                        <Form.Label>Giełda</Form.Label>
                        <Form.Control type="text" name="exchange" required 
                        placeholder="Wpisz nazwe giełdy"/>
                    </Form.Group>

                    <Form.Group controlId="course">
                        <Form.Label>Kurs</Form.Label>
                        <Form.Control type="text" name="course" required 
                        placeholder="Wpisz kurs"/>
                    </Form.Group>

                    <Form.Group controlId="currency">
                        <Form.Label>Waluta</Form.Label>
                        <Form.Control type="text" name="currency" required 
                        placeholder="Jaka waluta?"/>
                    </Form.Group>

                    <Form.Group controlId="status">
                        <Form.Label>ON/OFF</Form.Label>
                        <Form.Control type="number" name="status" required 
                        placeholder="ON/OFF"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Add Department
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}