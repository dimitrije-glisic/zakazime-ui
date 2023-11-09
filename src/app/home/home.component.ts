import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  user: User | undefined;

  constructor(private http: HttpClient) {
   
  }

  callUserPrivateApi() {
    this.http.get<User>('api/user').subscribe(
      data => {
        this.user = data; 
      }
    )
  }

}
