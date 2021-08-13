import axios from 'axios';
import authHeader from './auth-header';
import getUserId from './user-userId';

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
  updateAlerts(alertId, currency, exchange, threshold, active) {
    return axios.put(API_URL + 'Alert/' + alertId, {
      "alertId": alertId, "userId": getUserId(), "currency": currency, "exchange": exchange, "threshold": threshold, "active": active
    }, {
      headers:
        authHeader()
    })
  }

  addAlerts(currency, exchange, threshold, active) {
    return axios.post(API_URL + 'Alert/AddAlert', {
      "currency": currency, "exchange": exchange, "threshold": threshold, "active": active
    }, {
      headers:
        authHeader()
    })
  }

  deleteAlert(alertId) {
    return axios.delete(API_URL + 'Alert/' + alertId, {
      headers:
        authHeader()
    });
  }

  onOffAlert(alertId) {
    return axios.post(API_URL + 'Alert/' + alertId, {}, {
      headers:
        authHeader()
    })
  }


}

export default new UserService();
