import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import { throwError } from 'rxjs';
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
interface JwtPayload {
  exp: number;
  iat: number;
  id: string;
  role: string;
}
 const router = inject(Router);
  const token = localStorage.getItem('token');
   console.log("token get from the local ")
  if (token) {
    try {
      // ✅ decode token
      const decoded = jwtDecode<JwtPayload>(token);
        console.log("id of loging user/admin ",decoded.id);   // user/admin id
       console.log("role of user or admin ",decoded.role); // role
      console.log("token expire in ",decoded.exp);  // expiry timestamp
      const now = Date.now().valueOf() / 1000;

      // ✅ check expiry
      if (decoded.exp < now) {
        console.log("under exp ");
        
        localStorage.removeItem('token');
        router.navigate(['login']);
        return next(req); 
      }

      // ✅ attach header
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    } catch (err:any) {
      console.log("error while get the token ");
      
        if (err.status == 401) {   // Unauthorized
        localStorage.removeItem('token');
        router.navigate(['login']);
      }
      return throwError(() => err);
    }
      // localStorage.removeItem('token');
    //   router.navigate(['login']);
    //   return next(req);
    // }
  }
  // console.log('token not found ');
  
  return next(req);
};
