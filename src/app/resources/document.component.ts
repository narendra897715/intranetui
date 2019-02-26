import { Component, OnInit } from '@angular/core';
import { RequestOptions } from '@angular/http/src';
import { Router, ActivatedRoute } from '@angular/router';
import { BusinessLogicService } from '../business-logic.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: { 'class': 'section main hbox space-between' }
})
export class DocumentComponent implements OnInit {
  ResourceSubMenu: any;
  // ResourceSubMenu = [
  //   { 'categoryURL': 'policies', 'categoryName': 'Policies', 'serviceURL': 'resources/getResourcesPolicies' },
  //   { 'categoryURL': 'forms', 'categoryName': 'Forms', 'serviceURL': 'resources/getResourcesForms' },
  //   {'categoryURL': 'l&d', 'categoryName': 'L&D', 'serviceURL': 'resources/getResourcesL&D'}
  // ];

  public activeUrl: string;
  constructor(private businesslogic: BusinessLogicService, private route: ActivatedRoute,  private router: Router) { }

  ngOnInit() {
    this.businesslogic.get('resources/getResourcesCategory ').subscribe((response) => {
      this.ResourceSubMenu = response;
    });
   // this.redirect('Policies', 'resources/getResourcesPolicies', 'Policies');
  }

  redirect(url, serviceURL, categoryName) {
    this.activeUrl = url;
    this.router.navigate([url], { relativeTo: this.route });
   // this.businesslogic.receiveeventname(serviceURL);
  }



}
