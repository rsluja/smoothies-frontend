import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import { TokenStorageService } from 'src/app/shared/service/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup | any;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles: string[] = [];
   isAdmin: boolean = false;

 
  constructor(private authService: AuthService,
    private formBuilder: FormBuilder, 
    private router:Router,
    private token: TokenStorageService) {

}

  ngOnInit(): void {

    if (this.isSignedUp) {
      this.router.navigate(['/login']);
    } else {
      this.registerForm = this.formBuilder.group({
        username: [''],
        email: [''],
        password: ['']
      });
    }
  }

  register() {
    console.log(this.registerForm);
    this.authService.register(this.registerForm.value).subscribe(
    data => {
      this.isSignUpFailed = false;
      this.isSignedUp = true;
    },
    error => {
      this.errorMessage = error.error.errorMessage;
      this.isSignUpFailed = true;
    });
  }

  reloadPage() {
   window.location.reload();
  }
}
