import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import AppPages from 'src/app/common/constants/AppPages';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonSnackbarComponent } from 'src/app/shared/components/common-snackbar/common-snackbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  durationInSeconds = 5;
  // Login form declaration
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  showLoader = false;

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _snackBar: MatSnackBar
  ) { }

  // Method for authenticate the user
  login() {

    if (this.loginForm.valid) {
      let body = {
        email: this.loginForm?.value.email ?? '',
        password: this.loginForm?.value.password ?? ''
      };
      this.showLoader = true;
      this._authService.login(body).subscribe({
        next: (res) => {
          if (res) {
            this.showLoader = false;
            this._router.navigate([`${AppPages.Tasks}`]);
          }
        },
        error: (err) => {
          this.showLoader = false;
          this.opneSnackbar(err);
        }
      })
    }
  }

  // Method to display the error message
  // opneSnackbar(errMsg: any) {
  //   this._snackBar.openFromComponent(CommonSnackbarComponent, {
  //     duration: this.durationInSeconds * 1000,
  //     data: errMsg,
  //     panelClass: 'error-snackbar'
  //   });
  // }
}
