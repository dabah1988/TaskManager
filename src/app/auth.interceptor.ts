import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { AccountService } from './Services/account.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getAccessToken();
    const accountService = inject(AccountService);
  let authReq = req;

  // 🔑 Ajouter le token si présent
  if (token) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // 🔄 Token expiré → rafraîchir
        return authService.refreshToken().pipe(
          switchMap((newToken: string) => {
            authService.saveAccessToken(newToken);
             // ⚡️ Recharge infos user depuis localStorage
            accountService.loadUserFromStorage();
            // Relancer la requête avec le nouveau token
            const retryReq = req.clone({
              setHeaders: { Authorization: `Bearer ${newToken}` }
            });
            return next(retryReq);
          }),
          catchError(err => {
            // Si le refresh échoue → déconnexion
            authService.logout();
            return throwError(() => err);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
