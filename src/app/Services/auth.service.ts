// src/app/services/auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  // Supporte 'access_token' ou 'token' (selon ce que tu uses)
  getAccessToken(): string | null {
    return localStorage.getItem('access_token') || localStorage.getItem('token');
  }

  // Sauvegarde dans les deux clés pour compatibilité
  saveAccessToken(token: string): void {
    localStorage.setItem('access_token', token);
    localStorage.setItem('token', token);
  }

  // Utilise refreshToken ou refresh_token
  refreshToken(): Observable<string> {
    const refresh = localStorage.getItem('refreshToken') || localStorage.getItem('refresh_token');
    if (!refresh) {
      return throwError(() => new Error('No refresh token'));
    }

    return this.http
      .post<{ accessToken: string }>('/api/auth/refresh', { refreshToken: refresh })
      .pipe(map(res => res.accessToken));
  }

  logout(): void {
    // Supprime les tokens (et laisse ce que tu veux garder si besoin)
    localStorage.removeItem('access_token');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }
}
