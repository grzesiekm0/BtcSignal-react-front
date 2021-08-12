import React, { Component } from "react";
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar, Form, FormCheck, FormGroup } from 'react-bootstrap';
import { AddDepModal } from './AddDepModal';
import { EditDepModal } from './EditDepModal';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import UserService from "../services/user.service";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.refreshList = this.refreshList.bind(this);

    this.state = {
      deps: [], addModalShow: false, editModalShow: false, currentTutorial: null,
      currentIndex: -1, responsee: null, checked: ''
    };
    this.handeClick = this.handeClick.bind(this);
  }

  handeClick(e) {
    console.log("Wurde geklickt: " + e.target.id);
    const item = e.target.name;
    const isChecked = e.target.checked;
    console.log("Wurde geklickt: " + item);
    console.log("Wurde geklickt: " + isChecked);
    var key = parseInt(e.target.id);
    console.log("Key " + key);

    UserService.onOffAlert(parseInt(e.target.id)).then(
      response => {
        this.setState(
          prevState => ({

            deps: prevState.deps.map(
              el => el.alertId === key ? { ...el, active: response.data } : el
            )
          }));
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

  componentDidMount() {
    UserService.getUserAlerts().then(
      response => {
        this.setState({
          deps: response.data
        });
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

  refreshList() {
    UserService.getUserAlerts().then(
      response => {
        this.setState({
          deps: response.data
        });
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

  deleteDep(alertId) {
    if (window.confirm('Jesteś pewien?')) {
      UserService.deleteAlert(alertId).then(
        response => {
          this.refreshList();
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
      )
    }
  }
  render() {
    const { deps, alertId, currency, exchange, threshold, active } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });
    return (
      <div >
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Waluta</th>
              <th>Giełda</th>
              <th>Próg</th>
              <th>Aktualna cena</th>
              <th>Aktualizacja ceny</th>
              <th>Utworzono</th>
              <th>Aktywny</th>
              <th>Opcje</th>
            </tr>
          </thead>
          <tbody>
            {deps.map(dep =>
              <tr key={dep.alertId}>
                <td>{dep.currency}</td>
                <td>{dep.exchange}</td>
                <td>{dep.threshold}</td>
                <td>aktualna cena</td>
                <td>data aktualizacji</td>
                <td>{dep.createDate}</td>
                <td>
                  <Form>
                    <Form.Check
                      onChange={this.handeClick}
                      checked={dep.active}
                      className="checkBoxCard"
                      name={dep.currency}
                      type="switch"
                      id={dep.alertId}
                      label=""
                    />
                  </Form>


                </td>


                <td>
                  <ButtonToolbar>
                    <Button className="mr-2" variant="info"
                      onClick={() => this.setState({
                        editModalShow: true,
                        alertId: dep.alertId, currency: dep.currency, exchange: dep.exchange, threshold: dep.threshold, active: dep.active
                      })}>
                      Edit
                    </Button>

                    <Button className="mr-2" variant="danger"
                      onClick={() => this.deleteDep(dep.alertId)}>
                      Delete
                    </Button>

                    <EditDepModal show={this.state.editModalShow}
                      onHide={editModalClose}
                      alertId={alertId}
                      currency={currency}
                      exchange={exchange}
                      threshold={threshold}
                      active={active}
                    />
                  </ButtonToolbar>

                </td>

              </tr>)}
          </tbody>

        </Table>

        <ButtonToolbar>
          <Button variant='primary'
            onClick={() => this.setState({ addModalShow: true })}>
            Add Department</Button>

          <AddDepModal show={this.state.addModalShow}
            onHide={addModalClose} />
        </ButtonToolbar>
      </div>
    )
  }
}
