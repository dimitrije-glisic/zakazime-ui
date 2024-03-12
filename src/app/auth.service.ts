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
  private userSubject: BehaviorSubject<Account | undefined> = new BehaviorSubject<Account | undefined>(undefined);

  isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.checkLocalStorage();
  }

  registerUser(userData: RegistrationRequest): Observable<Account> {
    return this.http.post<Account>('/api/register', userData)
      .pipe(
        tap((response: Account) => {
          this.userSubject.next(response);
          localStorage.setItem('account', JSON.stringify(response)); // Store in local storage
          this.isLoggedInSubject.next(true);
          this.doDummyPostToObtainCsrfToken();
        })
      );
  }

  login(credentials: any) {
    const headers = new HttpHeaders(credentials ? {
      authorization: 'Basic ' + btoa(credentials.email + ':' + credentials.password)
    } : {});

    return this.http.get<Account>('api/login', {headers: headers}).pipe(
      tap(response => {
        if (response.email) {
          console.log('Login successful, setting userSubject');
          this.userSubject.next(response);
          localStorage.setItem('account', JSON.stringify(response)); // Store in local storage
          this.isLoggedInSubject.next(true);
          this.doDummyPostToObtainCsrfToken();

        } else {
          console.log('Login failed');
        }
      })
    );
  }

  logout() {
    return this.http.post('api/logout', {}).pipe(
      tap(() => {
        console.log('Logout successful, clearing userSubject');
        this.userSubject.next(undefined);
        localStorage.removeItem('account'); // Remove from local storage
        this.isLoggedInSubject.next(false);
      })
    )
  }

  fetchUser(): Observable<Account | undefined> {
    // console.log('fetchUser called');
    if (this.userSubject.getValue() === null) {
      // console.log('fetchUser making HTTP request');
      return this.http.get<Account>('/api/login', {withCredentials: true}).pipe(
        tap(response => {
          this.userSubject.next(response);
          localStorage.setItem('account', JSON.stringify(response)); // Store in local storage
        }),
        catchError(error => {
          // console.log('fetchUser error', error);
          this.userSubject.next(undefined);
          return of(undefined);
        })
      );
    } else {
      return this.userSubject.asObservable();
    }
  }

  get user$(): Observable<Account | undefined> {
    return this.userSubject.asObservable();
  }

  setInitialLoginState(): void {
    this.fetchUser().subscribe(user => {
      if (user !== null) {
        this.isLoggedInSubject.next(true);
      }
    });
  }

  doDummyPostToObtainCsrfToken() {
    this.http.post('api/dummy-post', {}).subscribe();
  }

  private checkLocalStorage() {
    const storedAccount = localStorage.getItem('account');
    if (storedAccount) {
      const account: Account = JSON.parse(storedAccount);
      this.userSubject.next(account);
      this.isLoggedInSubject.next(true);
    }
  }

  isLoggedIn() {
    return this.isLoggedInSubject.getValue();
  }
}




