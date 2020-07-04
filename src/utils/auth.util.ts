import Swal from 'sweetalert2';

export const isLoggedIn = () => {
  const user = sessionStorage.getItem('auth_token');

  if (user === null) {
    return false;
  }

  debugger;
  try {
    const data = JSON.parse(user) as UserData;
    if (data.email && data.name) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

interface UserData {
  name: string;
  email: string;
}

export const getFirstName = (): string => {
  if (!isLoggedIn()) {
    return '';
  }

  return getUser().name;
};

export const getUser = (): UserData => {
  if (!isLoggedIn()) {
    logOff();
    Swal.fire('Sua sessão expirou', 'Por favor, efetue login novamente', 'error');
    window.location.href = '/login';
    throw new Error('Sua sessão expirou');
  }

  const user = sessionStorage.getItem('auth_token')!;
  return JSON.parse(user) as UserData;
};

export const setAuth = (token: string) => {
  sessionStorage.setItem('auth_token', token);
};

export const getAuth = () => {
  return sessionStorage.getItem('auth_token');
};

export const logOff = () => {
  sessionStorage.removeItem('auth_token');
};