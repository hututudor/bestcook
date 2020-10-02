import React, { createContext, useState } from 'react';
import { User } from 'modules/interfaces/user';

interface AuthState {
  auth: boolean;
  jwt: string;
  user?: User;
}

interface ContextState {
  state: AuthState;
  login: (user: User, jwt?: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<ContextState>({
  state: {
    auth: false,
    jwt: ''
  },
  login: (user: User, jwt?: string) => {},
  logout: () => {}
});

export const AuthContextProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    auth: false,
    jwt: ''
  });

  const login = (user: User, jwt?: string) => {
    localStorage.setItem(
      'token',
      jwt ? jwt : localStorage.getItem('token') || ''
    );

    setState({
      ...state,
      jwt: jwt ? jwt : localStorage.getItem('token') || '',
      user,
      auth: true
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setState({ ...state, jwt: '', user: undefined, auth: false });
  };

  const [loading, setLoading] = useState(true);

  console.log('AUTH STATE', state);

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {loading && children}
    </AuthContext.Provider>
  );
};
