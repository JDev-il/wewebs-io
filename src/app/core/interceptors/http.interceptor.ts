import { forwardRef, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpClient,
} from '@angular/common/http';
import { Observable, of, share, tap } from 'rxjs';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  private cache: Map<HttpRequest<any>, HttpResponse<any>> = new Map();
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method !== "GET") {
      return next.handle(req)
    }
    return next.handle(req);
    // const cachedResponse: HttpResponse<any> | undefined = this.cache.get(req)
    // if (cachedResponse) {
    //   return of(cachedResponse.clone())
    // } else {
    //   return next.handle(req).pipe(
    //     tap(res=>{
    //       if(res instanceof HttpResponse){
    //         this.cache.set(req, res.clone().body)
    //       }
    //     })
    //   )
    // }
  }
}
