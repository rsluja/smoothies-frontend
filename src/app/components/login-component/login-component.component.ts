import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth.service';
import { TokenStorageService } from '../../shared/service/token-storage.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit {
  loginForm: FormGroup | any;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder, 
              private router:Router,
              private token: TokenStorageService) {
    
  }

  ngOnInit(): void {

    if (this.token.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.token.getUser().roles;
      this.router.navigate(['/allSmoothies']);
    } else {
      this.loginForm = this.formBuilder.group({
        username: [''],
        password: ['']
      })
    }
  }

  login() {
    console.log(this.loginForm);
    this.authService.login(this.loginForm.value).subscribe(
      data => {
        this.token.saveToken(data.token);
        this.token.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.token.getUser().roles;
        this.reloadPage();
      },
      error => {
        this.errorMessage = error.error.errorMessage;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }
}
