import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, map, Observable, tap} from 'rxjs';
import { UserAuth } from '../interfaces/user-auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = '/api/auth';

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  private userSubject = new BehaviorSubject<UserAuth | null>(this.getUserFromLocalStorage());
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<{ token: string; client: any }> {
    return this.http.post<{ token: string; client: any }>(`${this.api}/login`, credentials).pipe(
      tap((res) => {
        this.setToken(res.token);
        this.setUser(res.client);
      })
    );
  }

  register(user: Partial<UserAuth>): Observable<any> {
    return this.http.post(`${this.api}/register`, user, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  registerWithFormData(formData: FormData): Observable<any> {
    return this.http.post(`${this.api}/register`, formData);
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    this.isLoggedInSubject.next(false);
    this.userSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  setToken(token: string): void {
    localStorage.setItem('access_token', token);
    this.isLoggedInSubject.next(true);
  }

  setUser(user: Partial<UserAuth>): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user as UserAuth);
  }

  getUserFromLocalStorage(): UserAuth | null {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  }

  getCurrentUser(): Observable<UserAuth> {
    return this.http.get<UserAuth>(`/api/client`);
  }

  updateUser(data: FormData): Observable<UserAuth> {
    return this.http.put<{ message: string; client: UserAuth }>(`/api/client`, data).pipe(
      tap(response => {
        const updatedUser = response.client;
        localStorage.setItem('user', JSON.stringify(updatedUser));
        this.userSubject.next(updatedUser);
      }),
      map(response => response.client)
    );
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

}
