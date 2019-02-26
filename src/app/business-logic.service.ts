import { Injectable, Component, Inject, EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as io from 'socket.io-client';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { DialogData, Inotification } from './app.interface';
import {environment} from '../environments/environment';
@Injectable()
export class BusinessLogicService {
  // protected AppComp = new AppComponent;
  // tslint:disable-next-line:no-inferrable-type

  protected baseUrl = environment.apiUrl;

  public Otherapps = environment.internalAppsUrl;
  public socket = io(environment.SocketUrl);
  submenucall = new EventEmitter();
  //  production host name
  //  protected baseUrl = 'http://172.16.10.51:7007/';

  //  public Otherapps  = 'http://172.16.10.51:8088/';
  //  public socket = io('http://172.16.10.51:7007');

  // live host name
  // protected baseUrl = 'http://172.16.10.51:1234/';

  //  public Otherapps  = 'http://apps.merilytics.com:8080/';
  //  public socket = io('http://172.16.10.51:1234');

  public loadingImage = false;
  public employeeId: number = null;
  public isSuperAdmin = false;
  public isAdmin = false;
  public employeeName = null;
  private token: any;
  public firstname: any;
  queryParams: any;
  private subject = new Subject<any>();
  private newsandeventsubject = new Subject<any>();
  constructor(private http: HttpClient, public dialog: MatDialog, private router: Router) {
    this.socket.on('connect', () => {
      console.log('connected to server');
    });
    //  this.socket.on('newMessage',(email1)=>{

    //  console.log(email1);

    //  })
  }

  loadingImageChange(status: boolean) {
    this.loadingImage = status;
  }
  employeeIdChange(empId, isAdmin, empname, firstName, isSuperAdmin) {
    this.employeeId = empId;
    this.isAdmin = isAdmin;
    this.employeeName = empname;
    this.firstname = firstName;
    this.isSuperAdmin = isSuperAdmin;
  }
  get(serviceName: string): Observable<any> {
    return this.http
      .get(this.baseUrl + serviceName  ).pipe(
      map((response: Response) =>
      // tslint:disable-next-line:one-line
      {
        return response;
      }, (resson: Response) => { this.handleError(resson);
         }));
  }


  get_search(serviceName: string): Observable<any> {
    if (localStorage.getItem('AuthenticationToken')) {
      this.token = (localStorage.getItem('AuthenticationToken')).replace(/^"(.*)"$/, '$1');
      console.log(this.token);
    }
    return this.http
      .get(this.baseUrl + serviceName + '/', { headers: { 'Authorization': 'Token ' + this.token } }).pipe(
      map((response: Response) => {
        return response;
      }, (resson: Response) => { this.handleError(resson); }));
  }

  postUpdate(serviceName: string, postUpdateObject): Observable<any> {
    return this.http
      .post(this.baseUrl + serviceName, postUpdateObject).pipe(
      map((response: Response) =>
      // tslint:disable-next-line:one-line
      {
        return response;
      }, (resson: Response) => {
         this.handleError(resson);
       }));
  }

  sendMessage(message: string) {
    this.subject.next({ text: message });
  }
  sendMessagetosubmenu() {
    this.submenucall.emit();
  }


  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }




  post(serviceName: string, params: object[] | object | string | number): Observable<any> {
    try {
      // tslint:disable-next-line:max-line-length
      return this.http.post(this.baseUrl + serviceName, params).pipe(catchError(this.handleError as any));
    }
    // tslint:disable-next-line:one-line
    catch (error) { error.status = 401; this.handleError(error); }
  }
  post_unAuth(serviceName: string, params: object | string | number): Observable<any> {
    return this.http.post(this.baseUrl + serviceName + '/', params);
  }
  patch(serviceName: string, params: object | string | number, uniqueId: number): Observable<any> {
    return this.http
      .patch(this.baseUrl + serviceName + '/' + uniqueId + '/', params,
      { headers: { 'Authorization': 'Token ' + this.token } }).pipe(
      map((response: Response) => {
        return response;
      }, (resson: Response) => { this.handleError(resson); }));
  }
  delete(serviceName: string): Observable<any> {
    return this.http
      .delete(this.baseUrl + serviceName + '/').pipe(
      map((response: Response) => {
        return response;
      }, (resson: Response) => { this.handleError(resson); }));
  }

  handleError(error: Response) {
    // alert('problem with server');
    localStorage.clear();
    window.location.href =  environment.internalAppsUrl + 'Authentication/#/';
    if ((error.status === 401 || error.status === 403) && (window.location.href.match(/\?/g) || []).length < 2) {
      localStorage.clear();
      window.location.reload();
    }
  }

  receiveparams(params) {
      this.sendparams(params);
  }
  sendparams(params) {
     this.queryParams = params;
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'notificationDailog.html',
})

export class notificationDialog {
  // data : Inotification = {name:null};
  constructor(
    public dialogRef: MatDialogRef<notificationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Inotification = { name: null }) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
