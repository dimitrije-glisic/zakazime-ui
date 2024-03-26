import {Component} from '@angular/core';
import {AuthService} from "../../../auth.service";
import {Account} from "../../../interfaces/account";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {UpdateUserRequest} from "../../../interfaces/update-user-request";

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent {

  user: Account | undefined;
  editForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder,
              private router: Router) {
    this.user = this.authService.getCurrentUser();

    this.editForm = this.formBuilder.group({
      firstName: [this.user?.firstName || ''],
      lastName: [this.user?.lastName || ''],
      email: [this.user?.email || ''],
      phone: [this.user?.phone || ''],
      password: ['']
    });
  }

  ngOnInit(): void {
  }

  updateProfile() {
    if (this.editForm.valid) {
      console.log(this.editForm.value);
      this.authService.updateProfile(this.user!.id, this.editForm.value as UpdateUserRequest).subscribe(() => {
        console.log('Profile updated');
        this.router.navigate(['/me']);
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
