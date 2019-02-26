import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse
  } from '@angular/common/http';
  import {Injectable} from '@angular/core';
  import { Observable } from 'rxjs';
  import {BusinessLogicService} from './business-logic.service';
  import { tap } from 'rxjs/operators';
  import {environment} from '../environments/environment';
  @Injectable()
  export class AddHeaderInterceptor implements HttpInterceptor {
    reqHeader: any;
    numberofrequest = 0;
    numberofresponse = 0;
    constructor(public businesslogin: BusinessLogicService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.numberofrequest++;
      // console.log(req);
        this.businesslogin.loadingImageChange(true);
        /*For localhost*/
        if (req.url === environment.apiUrl + 'employee/getEmployeeDetailsWithToken') {
          this.reqHeader = req.clone({headers: req.headers.set('token', localStorage.getItem('AuthenticationToken'))});
        } else {
          this.reqHeader = req.clone({headers: req.headers.set('x-auth', localStorage.getItem('xauth'))});
        }
        /*For localhost*/
        /*For Production*/
        // if (req.url === 'http://intranet.merilytics.com/api/v1/employee/getEmployeeDetailsWithToken') {
        //   this.reqHeader = req.clone({headers: req.headers.set('token', localStorage.getItem('AuthenticationToken'))});
        // } else {
        //   this.reqHeader = req.clone({headers: req.headers.set('x-auth', localStorage.getItem('xauth'))});
        // }
        /*For Production*/
      return next.handle(this.reqHeader).pipe(
        tap(resp => {
          if (resp instanceof HttpResponse) {
            this.numberofresponse++;
            localStorage.setItem('xauth',  resp.headers.get('x-auth'));
            if (this.numberofrequest === this.numberofresponse) {
              this.numberofrequest = 0;
    this.numberofresponse = 0;
              this.businesslogin.loadingImageChange(false);
            } else {
            this.businesslogin.loadingImageChange(true);
           }
          }
        }, error => {
          this.numberofresponse++;
            this.businesslogin.loadingImageChange(false);
            // window.location.href = 'http://localhost:8080/Authentication/#/';
            // window.location.href = 'http://172.16.10.51:8088/Authentication/#/';
        })
      );
    }
  }
