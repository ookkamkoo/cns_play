import { Alert } from '../components/alert/alertComponent';
import { checkToken } from '~/services/authService';
import { getToken,logout } from '../auth/authToken';

export default defineNuxtRouteMiddleware(async (to, from) => {
  let token: string | null = null;
  if (typeof localStorage !== 'undefined') {
      token = getToken();
      
  }
  try {
    console.log(to.path);
      if (to.path !== '/') {
          if (token) {
              const check = await checkToken(token);
              if(!check){
                  logout()
                  return navigateTo('/');
              }
          } else {
              return navigateTo('/');
          }
      } else {
          if (token) {
              const check = await checkToken(token);
              console.log(check);
              
              if(!check){
                logout();
                // Alert("error","กรุณาเข้าสู่ระบบใหม่อีกครั้ง ใหม่อีกครั้ง.")
              }else{
                //   return navigateTo('/list-game/PG%20Soft');
                //   return navigateTo('/information/return-credit');
              }
          }
      }
  } catch (error) {
      // logout();
      return navigateTo('/');
  }
});