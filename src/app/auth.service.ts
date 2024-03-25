import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
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

    return this.http.get<Account>('api/login', {headers}).pipe(
      tap(response => {
        if (response.email) {
          this.setUser(response);
        } else {
          this.clearUser();
          throw new Error('Login failed');
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
    if (!this.currentUser) {
      this.useSession();
    }
    this.doDummyPostToObtainCsrfToken();
  }

  private setUser(user: Account): void {
    console.log('Setting user', user);
    this.currentUser = user;
    localStorage.setItem('account', JSON.stringify(user));
  }

  private clearUser(): void {
    console.log('Clearing user');
    this.currentUser = undefined;
    localStorage.removeItem('account');
  }

  private getStoredUser(): Account | undefined {
    console.log('Getting stored user')
    const storedAccount = localStorage.getItem('account');
    console.log('Stored account:', storedAccount);
    return storedAccount ? JSON.parse(storedAccount) : undefined;
  }

  private useSession(): void {
    console.log('Using session');
    this.http.get<Account>('api/login')
      .pipe(
        catchError(() => {
          return new Observable<Account>();
        })
      )
      .subscribe(user => {
        this.setUser(user);
      });
  }

  doDummyPostToObtainCsrfToken(): void {
    this.http.post('api/dummy-post', {}).subscribe();
  }

}




