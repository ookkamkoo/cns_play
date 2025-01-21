// import { Alert } from '../components/alert/alertComponent';
import { checkToken } from '~/services/authService';
import { getToken,logout } from '../auth/authToken';
import { memberStore } from '~/store/index';
const member = memberStore();

export default defineNuxtRouteMiddleware(async (to, from) => {
  let token: string | null = null;
  if (typeof localStorage !== 'undefined') {
      token = getToken();
  }
  try {
    console.log(to.path);
      if (to.path !== '/') {
        // console.log("aaaaaaaaaaa");
          if(to.path.startsWith('/alliance')){

          }else{
            if (token) {
              const check = await checkToken(token);
              if(!check){
                  logout()
                  return navigateTo('/');
              }
            } else {
              member.setShowLogin(true)
              return navigateTo('/');
            }
          }
      } else {
        console.log("ssssssss");
          if (token) {
            console.log("aaaaaaaaaaa");
              const check = await checkToken(token);
              console.log(check);
              
              if(!check){
                logout();
                // Alert("error","กรุณาเข้าสู่ระบบใหม่อีกครั้ง ใหม่อีกครั้ง.")
              }else{
                  console.log("wwwwwwwwwwwwwww");
                  
                  // return navigateTo('/alliance/alliance');
                  // return navigateTo('/information/minigame');
              }
              // }
          }else{
            console.log("dddddddddddddd");
            // member.setShowLogin(true)
          }
      }
  } catch (error) {
      // logout();
      // return navigateTo('/');
  }
});