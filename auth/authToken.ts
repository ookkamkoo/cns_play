import { memberStore } from '~/store/index';

// Initialize member store instance
const member = memberStore();

export interface TokenResponse {
  token: string;
  username: string;
}

// Function to set data in localStorage
export function setToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
}

export function setUsername(username: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('username', username);
  }
}

// Function to get data from localStorage
export function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

export function getUsername(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('username');
  }
  return null;
}

// Function to remove data from localStorage
export function removeToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }
}

// Function to handle logout
export function logout(): void {
  removeToken();
  member.setMemberLogin(false);
  console.log(member.login);
}