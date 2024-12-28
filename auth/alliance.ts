export interface TokenResponse {
    name: string;
    username: string;
    percent: string;
    company: string;
    ref: string;
    token: string;
    permission: string;
    credit: string;
  }
  
  // Generic function สำหรับ set ค่า
  function setItem(key: string, value: string): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      if (value) {
        localStorage.setItem(key, value);
      }
    }
  }
  
  // Generic function สำหรับ get ค่า
  function getItem(key: string): string | null {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const value = localStorage.getItem(key);
      return value ? value : null;
    }
    return null; // กรณีใช้งานใน SSR
  }
  
  // ฟังก์ชัน set สำหรับแต่ละฟิลด์ใน TokenResponse
  export function setName(name: string): void {
    setItem('name', name);
  }
  
  export function setUsername(username: string): void {
    setItem('username', username);
  }
  
  export function setPercent(percent: string): void {
    setItem('percent', percent);
  }
  
  export function setCompany(company: string): void {
    setItem('company', company);
  }
  
  export function setRef(ref: string): void {
    setItem('ref', ref);
  }

  export function setToken(token: string): void {
    setItem('token_alliance', token);
  }

  export function setPermission(permssion: string): void {
    setItem('permission_alliance', permssion);
  }
  
  export function setCredit(credit: string): void {
    setItem('credit', credit);
  }
  
  // ฟังก์ชัน get สำหรับแต่ละฟิลด์ใน TokenResponse
  export function getName(): string | null {
    return getItem('name');
  }
  
  export function getUsername(): string | null {
    return getItem('username');
  }
  
  export function getPercent(): string | null {
    return getItem('percent');
  }
  
  export function getCompany(): string | null {
    return getItem('company');
  }
  
  export function getRef(): string | null {
    return getItem('ref');
  }

  export function getToken(): string | null {
    return getItem('token_alliance');
  }
  
  export function getPermission(): string | null {
    return getItem('permission_alliance');
  }
  
  export function getCredit(): string | null {
    return getItem('credit');
  }
  