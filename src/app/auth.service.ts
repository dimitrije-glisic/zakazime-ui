import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Account} from "./interfaces/account";
import {RegistrationRequest} from "./interfaces/registration-request";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: Account | undefined;

  constructor(private http: HttpClient) {
    this.initializeUserState();
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  registerUser(userData: RegistrationRequest): Observable<Account> {
    return this.http.post<Account>('/api/register', userData).pipe(
      tap(response => this.setUser(response))
    );
  }

  login(credentials: any): Observable<Account> {
    const headers = new HttpHeaders(credentials ? {
      authorization: 'Basic ' + btoa(credentials.email + ':' + credentials.password)
    } : {});

    return this.http.get<Account>('api/login', { headers }).pipe(
      tap(response => {
        if (response.email) {
          this.setUser(response);
        } else {
        }
      }),
      catchError(error => {
        this.clearUser();
        throw new Error('Login failed');
      })
    );
  }

  logout(): void {
    this.http.post('api/logout', {}).subscribe(() => this.clearUser());
  }

  getCurrentUser(): Account | undefined {
    return this.currentUser;
  }

  initializeUserState(): void {
    this.currentUser = this.getStoredUser();
  }

  private setUser(user: Account): void {
    this.currentUser = user;
    localStorage.setItem('account', JSON.stringify(user));
  }

  private clearUser(): void {
    this.currentUser = undefined;
    localStorage.removeItem('account');
  }

  private getStoredUser(): Account | undefined {
    const storedAccount = localStorage.getItem('account');
    return storedAccount ? JSON.parse(storedAccount) : undefined;
  }

  doDummyPostToObtainCsrfToken(): void {
    this.http.post('api/dummy-post', {}).subscribe();
  }

}




