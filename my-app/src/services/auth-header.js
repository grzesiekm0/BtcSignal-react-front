export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  if (user && user.message) {
    return { Authorization: `Bearer ${user.message}` };
  } else {
    return {};
  }
}