import { HttpInterceptorFn } from "@angular/common/http";
import { AuthService } from "../../services/auth.service";
import { inject } from "@angular/core";

// Créez un interceptor fonctionnel
// jwt-interceptor.ts (Angular v16+)
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken(); // ex: localStorage.getItem('access_token')

  const isUsable =
    token !== null &&
    token !== undefined &&
    token !== 'null' &&
    token !== 'undefined' &&
    String(token).trim() !== '' &&
    !isExpired(token);                // <-- optionnel mais conseillé

  if (isUsable) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  return next(req);
};

// petit helper sans dépendance externe
function isExpired(jwt: string): boolean {
  try {
    const payload = JSON.parse(atob(jwt.split('.')[1]));
    if (!payload?.exp) return false;
    const nowSec = Math.floor(Date.now() / 1000);
    return payload.exp <= nowSec;
  } catch { return true; }
}
