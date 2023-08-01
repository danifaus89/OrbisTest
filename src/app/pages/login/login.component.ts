import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.authenticate(this.username, this.password).subscribe(user => {
      if (user.length>0) {
        this.router.navigate(['/home']);
      } else {
        window.alert('Invalid credentials')
      }
    });
  }
}
