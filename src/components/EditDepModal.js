import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import UserService from "../services/user.service";

export class EditDepModal extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        const number = event.target.active.valueAsNumber;

        UserService.updateAlerts(
            this.props.alertId,

            event.target.currency.value,
            event.target.exchange.value,
            Number(parseFloat(event.target.threshold.valueAsNumber).toFixed(2)),
            Boolean(!!number)
        ).then(
            response => {
                this.setState({
                    deps: response.data
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
                            Edit Department
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="AlertId">
                                        <Form.Label>AlertId</Form.Label>
                                        <Form.Control type="number" name="alertId" required
                                            disabled
                                            defaultValue={this.props.alertId}
                                            placeholder="Alertid" />
                                    </Form.Group>

                                    <Form.Group controlId="Currency">
                                        <Form.Label>Waluta</Form.Label>
                                        <Form.Control type="text" name="currency" required
                                            defaultValue={this.props.currency}
                                            placeholder="Currency" />
                                    </Form.Group>

                                    <Form.Group controlId="Exchange">
                                        <Form.Label>Giełda</Form.Label>
                                        <Form.Control type="text" name="exchange" required
                                            defaultValue={this.props.exchange}
                                            placeholder="Exchange" />
                                    </Form.Group>

                                    <Form.Group controlId="threshold">
                                        <Form.Label>Próg</Form.Label>
                                        <Form.Control type="number" name="threshold" required
                                            defaultValue={this.props.threshold}
                                            placeholder="threshold" />
                                    </Form.Group>

                                    <Form.Group controlId="active">
                                        <Form.Label>Aktywny</Form.Label>
                                        <Form.Control type="number" name="active" required
                                            defaultValue={this.props.active}
                                            placeholder="Aktywny" />
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
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>

                </Modal>

            </div>
        )
    }

}