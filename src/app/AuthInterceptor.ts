import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve the token from localStorage or sessionStorage
    const token = localStorage.getItem('accesstoken');  // Or sessionStorage if you prefer

    // If the token is available, clone the request and add the Authorization header
    if (token) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(clonedRequest); // Pass the cloned request with Authorization header
    }

    // If no token is found, just pass the original request
    return next.handle(req);
  }
}
