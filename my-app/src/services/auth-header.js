export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.message) {
    return { Authorization: 'Bearer ' + user.message, Accept:'application/json'}; // for Spring Boot back-end
    //return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  } else {
    return {};
  }
}
/*
 function authHeader2() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.message) {
    return { Authorization: 'Bearer ' + user.message, Accept:'application/json',
    'Content-Type':'application/json'}; // for Spring Boot back-end
    //return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  } else {
    return {};
  }
}*/
