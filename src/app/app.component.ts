import { Component } from '@angular/core';
import {FooterControlService} from "./shared/footer-control.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ZakaziMe';

  constructor(public footerControlService: FooterControlService) {}

}
