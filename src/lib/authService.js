import axios from 'axios';

class AuthService {
  constructor() {
    this.auth = axios.create({
      baseURL: 'http://localhost:5000',
      withCredentials: true
    })
  }

  signup(user) {
    const { username, password } = user;
    return this.auth.post('/auth/signup', { username, password })
      .then(({ data }) => data)
      .catch((err) => {
        console.log("Error: ", err)
      });
  }

  login(user) {
    const { username, password } = user;
    return this.auth.post('/auth/login', { username, password })
      .then(({ data }) => data)
      .catch((err) => {
        console.log("Error: ", err)
      });
  }

  logout() {
    return this.auth.post('/auth/logout', {})
      .then(({ data }) => data)
      .catch((err) => {
        console.log("Error: ", err)
      });
  }

  me(user) {
    return this.auth.get('/auth/me')
      .then(({ data }) => data)
      .catch((err) => {
        console.log("Error: ", err)
      });
  }
}

const authService = new AuthService();

export default authService;
