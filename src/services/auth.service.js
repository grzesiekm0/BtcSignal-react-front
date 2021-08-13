import axios from "axios";

const API_URL = "https://localhost:44363/api/auth/";

class AuthService {
  login(Email, Password) {
    return axios
      .post(API_URL + "login", {
        Email,
        Password
      })
      .then(response => {
        if (response.data.message) {
          console.log('Chyba ustawiono')
          localStorage.setItem("user", JSON.stringify(response.data));
         
        }

        return response.data;
      });
  }

  logout() {
    localStorage.clear();
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
