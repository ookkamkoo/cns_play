// import { Alert } from '../components/alert/alertComponent';
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
        // console.log("aaaaaaaaaaa");
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
        // console.log("ssssssss");
          if (token) {
              const check = await checkToken(token);
              console.log(check);
              
              if(!check){
                logout();
                // Alert("error","กรุณาเข้าสู่ระบบใหม่อีกครั้ง ใหม่อีกครั้ง.")
              }else{
                  return navigateTo('/list-game/PG%20Soft');
              }
          }
      }
  } catch (error) {
      // logout();
      return navigateTo('/');
  }
});