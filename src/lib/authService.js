import axios from 'axios';

class AuthService {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_URL_AUTH,
      withCredentials: true
    })
  }

  signup(user) {
    return this.auth.post('/auth/signup', user)
  }

  login(user) {
    return this.auth.post('/auth/login', user);
  }

  initGoogle(tokenId) {
    return this.auth.post('/auth/google', tokenId);
  }

  logout() {
    return this.auth.post('/auth/logout', {})
      .then(({ data }) => {
        console.log('Logout successful');
        return data;
      })
      .catch((err) => {
        console.log("Error: ", err)
      });
  }

  me() {
    return this.auth.get('/auth/me')
      .then(({ data }) => data)
      .catch((err) => {
        console.log("Error: ", err)
      });
  }
}

const authService = new AuthService();

export default authService;
