import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
interface JwtPayload {
  exp: number;
  id: string;
  role: string;
}
export const authgaurdGuard: CanActivateFn = (route, state) => {
   const router = inject(Router);
  const token = localStorage.getItem('token');
  // console.log("auth gard workng properly");
  
  if (!token) {
    router.navigate(['login']);
    return false;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    
    console.log("auth gard workng properly",decoded);

    if (decoded.exp && decoded.exp > currentTime) {
      return true; // ✅ valid token
    } else {
      localStorage.removeItem('token');
      router.navigate(['login']);
      return false;
    }
  } catch (err) {
    localStorage.removeItem('token');
    router.navigate(['login']);
    return false;
  }

};
