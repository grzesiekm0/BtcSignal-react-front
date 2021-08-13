import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import UserService from "../services/user.service";

export class AddDepModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        const number = event.target.active.valueAsNumber;

        UserService.addAlerts(
            event.target.currency.value,
            event.target.exchange.value,
            Number(parseFloat(event.target.threshold.valueAsNumber).toFixed(2)),
            Boolean(!!number)
        ).then(
            response => {
                this.setState({
                    deps: response.data,
                });
                alert("Sukces!");
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
    render() {
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
                                    <Form.Group controlId="currency">
                                        <Form.Label>Waluta</Form.Label>
                                        <Form.Control type="text" name="currency" required
                                            placeholder="Wybierz walute" />
                                    </Form.Group>

                                    <Form.Group controlId="exchange">
                                        <Form.Label>Giełda</Form.Label>
                                        <Form.Control type="text" name="exchange" required
                                            placeholder="Wpisz nazwe giełdy" />
                                    </Form.Group>

                                    <Form.Group controlId="threshold">
                                        <Form.Label>Próg cenowy</Form.Label>
                                        <Form.Control type="number" name="threshold" required
                                            placeholder="Wpisz kurs" />
                                    </Form.Group>

                                    <Form.Group controlId="active">
                                        <Form.Label>ON/OFF</Form.Label>
                                        <Form.Control type="number" name="active" required
                                            placeholder="ON/OFF" />
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