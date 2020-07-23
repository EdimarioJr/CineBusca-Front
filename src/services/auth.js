const auth = {
  isAuthenticated: () => {
    if (sessionStorage.getItem(process.env.REACT_APP_SECRET_JWT) !== null)
      return true;
    else {
      sessionStorage.removeItem(process.env.REACT_APP_SECRET_JWT);
      return false;
    }
  },
  login: (token) => {
    sessionStorage.setItem(process.env.REACT_APP_SECRET_JWT, token);
  },
  logout: () => {
    return sessionStorage.removeItem(process.env.REACT_APP_SECRET_JWT);
  },
  getToken: () => {
    return sessionStorage.getItem(process.env.REACT_APP_SECRET_JWT);
  },
};

export default auth;
