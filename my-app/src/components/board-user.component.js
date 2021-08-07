import React, { Component } from "react";
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddDepModal} from './AddDepModal';
import {EditDepModal} from './EditDepModal';

import UserService from "../services/user.service";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.refreshList = this.refreshList.bind(this);

    this.state = {
      //content: ""
      deps:[], addModalShow:false, editModalShow:false, currentTutorial: null,
      currentIndex: -1, responsee: null
    };
  }

 /* componentDidMount() {
    UserService.getAdminBoard().then(
      response => {response=>response.json()
      }, 
      data=>{
        this.setState({deps:data});
    },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }*/

  componentDidMount() {
    UserService.getUserAlerts().then(
      response => {
        this.setState({
          deps: response.data
          //deps:data
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

  /*componentDidUpdate(prevProps, prevState){
    console.log('Jestem w did update')
    console.log(prevProps.alertId)
    console.log(this.props.alertId)
    //this.forceUpdate();
    //window.location.reload(false);
//if (prevState.alertId !== this.state.deps.alertId) {
  if (prevState.exchange !== null & prevState.exchange !== undefined){
  if (prevState.exchange == this.state.deps[0].exchange) {
  UserService.getUserAlerts().then(
    response => {
      this.setState({
        deps: response.data
        //deps:data
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
  
    console.log('Jestem w warunku')
  }
}
}*/

refreshList() {
  //this.retrieveTutorials();
  UserService.getUserAlerts().then(
    response => {
      this.setState({
        deps: response.data
        //deps:data
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
  );//--
  //this.setState({
    //currentTutorial: null,
    //currentIndex: -1
  //});
}

deleteDep(alertId){
  if(window.confirm('Jesteś pewien?')){
      /*
    fetch(process.env.REACT_APP_API+'alert/'+alertId,{
          method:'DELETE',
          header:{'Accept':'application/json',
      'Content-Type':'application/json'}
      })
     this.refreshList(); 
  }*/

  UserService.deleteAlert(alertId).then(
    //response => {response.then((body) => console.log(body))}

    response => {
      //this.setState({
        //deps:  response.data
        //deps:data
        //responsee: response.data
      //});
      //console.log(response.ok)
      //if(response.data) {
        
        //return 
        this.refreshList();
     //}

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
  )//.then( response => {
    //if(response.ok) {
     // return this.refreshList();
  //}
  //throw new Error('Network response was not ok.');
 //}
 
 //)
 ;

  //if(this.responsee != null) {
    //return this.refreshList();
//}
  //this.refreshList();
}
}
  render() {
    const {deps, alertId, userId, exchange, course, currency, status}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>AlertId</th>
                        <th>UserId</th>
                        <th>Giełda</th>
                        <th>Kurs</th>
                        <th>Obecny kurs</th>
                        <th>Status</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep=>
                            <tr key={dep.alertId}>
                                <td>{dep.alertId}</td>
                                <td>{dep.userId}</td>
                                <td>{dep.exchange}</td>
                                <td>{dep.course}</td>
                                <td>{dep.currency}</td>
                                <td>{dep.status}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        alertId:dep.alertId,userId:dep.userId,exchange:dep.exchange,course:dep.course,currency:dep.currency,status:dep.status })}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteDep(dep.alertId)}>
            Delete
        </Button>

        <EditDepModal show={this.state.editModalShow}
        onHide={editModalClose}
        alertId={alertId}
        userId={userId}
        exchange={exchange}
        course={course}
        currency={currency}
        status={status}
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Department</Button>

                    <AddDepModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
  }
}
