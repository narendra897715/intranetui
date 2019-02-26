import { Component} from '@angular/core';
import { BusinessLogicService } from './business-logic.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent    {
  title = 'app';
 constructor(public businesslogic: BusinessLogicService) {
   this.businesslogic.loadingImage = false;
 }

}
