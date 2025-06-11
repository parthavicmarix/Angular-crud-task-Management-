import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TaskManagementSystem';
  isAuthenticated = false;

  constructor(
    private readonly _authService: AuthService,
  ) { }

  ngOnInit(): void {
    // Check if user authenticated or not
    this._authService.isAuthenticated$.subscribe(authenticated => {
      this.isAuthenticated = authenticated;
    })
  }
}
