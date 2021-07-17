type LogoutFunction = () => void;

interface TokenManager {
  token: string;
  logout: Array<LogoutFunction>;
  setToken: (token: string) => void;
  setLogoutMethod: (logout: LogoutFunction) => void;
  doLogout: () => void;
}

export const tokenManager: TokenManager = {
  token: '',
  logout: [],
  setToken(t: string) {
    this.token = t;
  },
  setLogoutMethod(m) {
    this.logout = [m];
  },
  doLogout() {
    this.logout.forEach((i: LogoutFunction) => i());
  },
};
