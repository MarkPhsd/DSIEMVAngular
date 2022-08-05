import { Injectable } from '@angular/core';
export const InterceptorSkipHeader = 'X-Skip-Interceptor';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IUser {
  id: number;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  authdata?: string;
  resetCode?: string;
  email: string;
  sourceURL: string;
  token: string;
  phone: string;
  roles: string;
  type:  string;
  employeeID: number;
  metrcUser: string;
  metrcKey: string;
  loginAttempts: number;
  message: string;
  errorMessage: string;
  apiURL  : string;
}


@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

  get user() : IUser{
    const userString = localStorage.getItem('user')
    return JSON.parse(userString)
  }

  constructor()
  {

  }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      const user = this.user;

      if (request.headers.has(InterceptorSkipHeader)) {
        const headers = request.headers.delete(InterceptorSkipHeader);
        return next.handle(request.clone({ headers }));
      }

      if (user) {
        user.authdata = window.btoa(user.userName + ':' + user.password);
        if (  user.authdata) {
          request = request.clone({
            setHeaders: {
              Authorization: `Basic ${user.authdata}`
            }
          });

        }
        return next.handle(request);
      }

    }
}
