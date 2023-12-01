import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './interfaces/user.interface';
import { RegistrationRequest } from './interfaces/registration-dto.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  registerUser(userData: RegistrationRequest): Observable<User> {
    return this.http.post<User>('/api/register', userData)
      .pipe(
        tap((response: User) => {
          this.userSubject.next(response);
          this.isLoggedInSubject.next(true);
          this.doDummyPostToObtainCsrfToken();
        })
      );
  }

  login(credentials: any) {
    const headers = new HttpHeaders(credentials ? {
      authorization: 'Basic ' + btoa(credentials.email + ':' + credentials.password)
    } : {});

    return this.http.get<User>('api/login', { headers: headers }).pipe(
      tap(response => {
        if (response.email) {
          console.log('Login successful, setting userSubject');
          this.userSubject.next(response);
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
        this.userSubject.next(null);
        this.isLoggedInSubject.next(false);
      })
    )
  }

  fetchUser(): Observable<User | null> {
    // console.log('fetchUser called');
    if (this.userSubject.getValue() === null) {
      // console.log('fetchUser making HTTP request');
      return this.http.get<User>('/api/user', { withCredentials: true }).pipe(
        tap(response => {
          this.userSubject.next(response);
        }),
        catchError(error => {
          // console.log('fetchUser error', error);
          this.userSubject.next(null);
          return of(null);
        })
      );
    } else {
      return this.userSubject.asObservable();
    }
  }

  get user$(): Observable<User | null> {
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

}




