import { Injectable, Injector, Inject, PLATFORM_ID } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class HttpDevInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, @Inject(PLATFORM_ID) private platformId: string) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenApi = sessionStorage.getItem('access_token');

    if (req.url.includes('@plenary-api')) {
      req = req.clone({
        url: req.url.replace('@plenary-api', environment.apiPublic),
      });
    }

    if (tokenApi) {
      req = req.clone({
        setHeaders: this.getOptions(req),
      });
    }

    return next.handle(req);
  }

  getOptions(req: HttpRequest<any>): any {
    const tokenApi = sessionStorage.getItem('access_token');
    const isFormData = req.body instanceof FormData;
    if (isFormData) {
      return {
        'Access-Control-Allow-Origin': '*',
        Authorization: tokenApi,
      };
    }

    return {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: tokenApi,
    };
  }
}
