import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

import UserService from "../services/user.service";

export class EditDepModal extends Component{
    constructor(props){
        super(props);
        
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        /*fetch(process.env.REACT_APP_API+'alert/'+this.props.alertId,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                alertId:event.target.AlertId.valueAsNumber,
                userId:event.target.UserId.valueAsNumber,
                exchange:event.target.Exchange.value,
                course:event.target.Course.value,
                status:event.target.Status.valueAsNumber,
                currency:event.target.Currency.value             
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })*/

            UserService.updateAlerts(this.props.alertId,
                    event.target.UserId.valueAsNumber,
                    event.target.Exchange.value,
                    event.target.Course.value,
                    event.target.Status.valueAsNumber,
                    event.target.Currency.value             
                ).then(
              response => {
                this.setState({
                  deps: response.data
                  //deps:data

                });
               // window.location.reload(false);
                //return 1;
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
              }//, window.location.reload(false)
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
            Edit Department
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="AlertId">
                        <Form.Label>AlertId</Form.Label>
                        <Form.Control type="number" name="AlertId" required
                        disabled
                        defaultValue={this.props.alertId} 
                        placeholder="Alertid"/>
                    </Form.Group>

                    <Form.Group controlId="UserId">
                        <Form.Label>UserId</Form.Label>
                        <Form.Control type="number" name="UserId" required 
                        defaultValue={this.props.userId}
                        placeholder="UserId"/>
                    </Form.Group>

                    <Form.Group controlId="Exchange">
                        <Form.Label>Exchange</Form.Label>
                        <Form.Control type="text" name="Exchange" required 
                        defaultValue={this.props.exchange}
                        placeholder="Exchange"/>
                    </Form.Group>

                    <Form.Group controlId="Course">
                        <Form.Label>Course</Form.Label>
                        <Form.Control type="text" name="Course" required 
                        defaultValue={this.props.course}
                        placeholder="Course"/>
                    </Form.Group>

                    <Form.Group controlId="Currency">
                        <Form.Label>Currency</Form.Label>
                        <Form.Control type="text" name="Currency" required 
                        defaultValue={this.props.currency}
                        placeholder="Currency"/>
                    </Form.Group>

                    <Form.Group controlId="Status">
                        <Form.Label>Status</Form.Label>
                        <Form.Control type="number" name="Status" required 
                        defaultValue={this.props.status}
                        placeholder="Status"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update Department
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide }>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}