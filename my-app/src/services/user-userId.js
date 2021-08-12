export default function getUserId() {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user.userId;
  console.log(user);
  if (user && user.userId) {
    return userId;
  } else {
    return {};
  }
}