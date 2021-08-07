import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://localhost:44363/api/';

class UserService {
  //public
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }
  //user 
  getUserAlerts() {
    return axios.get(API_URL + 'Alert/AlertsForUser', { headers: authHeader() });
  }
  //admin
  getAdminBoard() {
  return axios.get(API_URL + 'Alert/AlertsForAdmin', { headers: authHeader() });
  }
  //universal
  updateAlerts(alertId, userId, exchange, course,  status, currency) {
    return axios.put(API_URL + 'Alert/' + alertId, {"exchange":exchange,"course":course,"currency":currency,"status":status,"userId":userId, "alertId":alertId},{ headers: authHeader() });
  }

  /*addAlerts( userId, exchange, course,  status, currency) {
    return axios.post(API_URL + 'Alert/', {"exchange":exchange,"course":course,"currency":currency,"status":status,"userId":userId},{ headers: authHeader() });
  }*/

  addAlerts( userId, exchange, course,  status, currency) {
    return axios.post(API_URL + 'Alert/', {"exchange":exchange,"course":course,"currency":currency,"status":status,"userId":userId},{Accept:'application/json', responseType:'application/json' }, { headers: authHeader() });
  }

  deleteAlert(alertId) {
    return axios.delete(API_URL + 'Alert/' + alertId,{Accept:'application/json', responseType:'application/json' });
  }

  
}

export default new UserService();
