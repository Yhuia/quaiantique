import { setCookie, destroyCookie, parseCookies } from 'nookies';
// gestion du token
let saveToken =  (token,admin,user) =>{
    // await localStorage.setItem('token', token);
    setCookie(null, 'token', token, {
       maxAge: 30 * 24 * 60 * 60, // 30 days
       path: '/',
    });
    setCookie(null, 'admin', admin, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
     });
     setCookie(null, 'user', user, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
     });
     
 }
 

let logout =  () =>{
   //await  localStorage.removeItem('token')
   destroyCookie(null,'token')
   destroyCookie(null,'admin')
   destroyCookie(null,'user')
}

// let isLogged = async () =>{
//     if (typeof localStorage !== 'undefined') {
//      let token = await localStorage.getItem('token')
//     return !!token; 
//     }
// }

let isLogged =  () => {
    const cookies = parseCookies();
    return !!cookies.token;
}

let isAdmin = () => {
    const cookies = parseCookies();
    const admin = cookies.admin ;
    return parseInt(admin);
}
let isUser = () => {
    const cookies = parseCookies();
    const user = cookies.user ;
    return parseInt(user);
}

export const accountService = {
    isLogged,logout,saveToken,isAdmin,isUser
}


