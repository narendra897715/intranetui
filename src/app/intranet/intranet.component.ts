import { Component, OnInit, ViewChild, AfterViewInit, ElementRef  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BusinessLogicService } from 'src/app/business-logic.service';
import {MatDialog} from '@angular/material';
import {IEmployeeInfo} from '../app.interface';
import {ConfirmDailogComponent} from './../confirm-dailog/confirm-dailog.component';
@Component({
  selector: 'app-intranet',
  templateUrl: './intranet.component.html',
  styleUrls: ['./intranet.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: { 'class': 'section main hbox space-between' }
})
export class IntranetComponent implements OnInit {
  @ViewChild('message') message: ElementRef;
  tabsdata: Itab[];
  activeUrl: string;
  sidenavwidth = '0px';
  Apps: any[];
  userdata: IEmployeeInfo = { employeeID: null, emailId: null, roleID: null, firstName: null, lastName: null, fullName: null,
    dateOfJoining: null,
    isActive: null,
    designation: null,
    domainName: null,
    reportingManager: null,
    workLocation: null,
    isAdmin: null,
    isSuperAdmin : null
   };


  constructor(private router: Router, private route: ActivatedRoute, public businesslogic: BusinessLogicService,
              public dialog: MatDialog) { }

  ngOnInit() {
    if (localStorage.getItem('AuthenticationToken')) {
      
      localStorage.clear();
      localStorage.setItem('AuthenticationToken',  window.name);
    } else {
      localStorage.setItem('AuthenticationToken',  window.name);
    }
  
    this.tabsdata = [
      { name: 'News & Updates', url: 'newsupdates' },
      { name: 'Our Team', url: 'people' },
      { name: 'Interaction Forums', url: 'forums' },
      { name: 'Apps', url: 'apps' },
      { name: 'Resources', url: 'documents' }

    ];
    if (this.businesslogic.employeeId == null) {
      this.businesslogic.get('employee/getEmployeeDetailsWithToken'
    ).subscribe((response: any) => {

if (response.length === 0 && localStorage.getItem('AuthenticationToken')) {

localStorage.removeItem('AuthenticationToken');
window.location.href = this.businesslogic.Otherapps + 'Authentication/#/';
} else {
this.userdata = response[0];
this.businesslogic.employeeIdChange(this.userdata.employeeID, this.userdata.isAdmin, this.userdata.fullName,
  this.userdata.firstName, this.userdata.isSuperAdmin);
this.businesslogic.postUpdate('resources/getUserApps', {'employeeId': this.businesslogic.employeeId}).subscribe((response: any) => {
  this.Apps = response;
 });

}
});
    }

  // this.redirect('newsupdates');
  }
  redirect(url) {
    this.sidenavwidth = '0px';
    this.activeUrl = url;
    this.router.navigate([url], { relativeTo: this.route });
  }
  opensidnav() {
    this.sidenavwidth = '250px';
  }
  closeNav() {
    this.sidenavwidth = '0px';
  }
  changepassword() {
    window.location.href = this.businesslogic.Otherapps + '/Authentication/#/changePassword';
  }
  callLogoutRequest() {
    const dialogRef = this.dialog.open(ConfirmDailogComponent, { width: '20%', data : {warning: 'Are you sure you want to logout ?'}});

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
           localStorage.removeItem('AuthenticationToken');
           window.location.href = this.businesslogic.Otherapps + 'Authentication/#/';
      }
    });
      }

      GotoApplication(url, isinternalapp) {
        if (isinternalapp === true) {
          window.location.href = url;
        } else {
          window.open(url, '_blank');
        }
        // window.location.href = url,'_blank';
      }
  }




interface Itab {
  name: string;
  url: string;
  // tslint:disable-next-line:eofline
}