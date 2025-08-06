import { HttpInterceptorFn } from "@angular/common/http";
import { AuthService } from "../../services/auth.service";
import { inject } from "@angular/core";

// Créez un interceptor fonctionnel
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  
  
  const authService = inject(AuthService);
  const token = authService.getToken();
  
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  return next(req);
};