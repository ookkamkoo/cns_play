import { memberStore } from '~/store/index';


export interface TokenResponse {
  token: string;
  username: string;
}

// Function to set data in localStorage
export function setToken(token: string): void {
  if (typeof token !== 'undefined') {
    localStorage.setItem('token', token);
  }
}

export function setUsername(username: string): void {
  if (typeof username !== 'undefined') {
    localStorage.setItem('username', username);
  }
}

// Function to get data from localStorage
export function getToken(): string | null {
  if (typeof localStorage.getItem('token') !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

export function getUsername(): string | null {
  if (typeof localStorage.getItem('username') !== 'undefined') {
    return localStorage.getItem('username');
  }
  return null;
}

// Function to remove data from localStorage
export function removeToken(): void {
  if (typeof localStorage.removeItem('token') !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }
}

// Function to handle logout
export function logout(): void {
  const member = memberStore();
  removeToken();
  member.setMemberLogin(true);
  // console.log("login = "+member.login);
}