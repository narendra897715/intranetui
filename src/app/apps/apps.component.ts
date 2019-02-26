import { Component, OnInit } from '@angular/core';
import { BusinessLogicService } from '../business-logic.service';
@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss'],
   // tslint:disable-next-line:use-host-property-decorator
   host: { 'class': 'section main hbox space-between' }
})
export class AppsComponent implements OnInit {
public hidecalender: boolean;
teams = 'assets/images';
 Apps = [];

  constructor(private businesslogic: BusinessLogicService) { }

  ngOnInit() {
    if (this.businesslogic.employeeId == null) {
      this.businesslogic.get('employee/getEmployeeDetailsWithToken').subscribe((response: any) => {
        this.businesslogic.employeeId = response[0].employeeID;
        this.businesslogic.postUpdate('resources/getUserApps', {'employeeId': this.businesslogic.employeeId}).subscribe((response: any) => {
          this.Apps = response;
         });
        // this.businesslogic.employeeIdChange(this.userdata.employeeID,this.userdata.isAdmin);
      });
    } else {
      this.businesslogic.postUpdate('resources/getUserApps', {'employeeId': this.businesslogic.employeeId}).subscribe((response: any) => {
        this.Apps = response;
       });
    }
  }

  GotoApplication(url, isinternalapp) {
    if (isinternalapp === true) {
      window.location.href = url;
     
    } else {
      if (url === 'http://172.16.10.51:6004/#/auth/') {
            url = 'http://172.16.10.51:6004/#/auth/' + localStorage.getItem('AuthenticationToken');
      }
      window.open(url, '_blank');
    }
    
    // window.location.href = url,'_blank';
  }

}
