import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/auth.service';
import {Account} from "../../../interfaces/account";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  loggedIn: boolean = false;
  user: Account | undefined;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.loggedIn = this.authService.isLoggedIn();
  }


}
