import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalUserService } from 'src/app/shared/services/localUser.serice';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginComponent implements OnInit {
loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private localUserService: LocalUserService) { }

  ngOnInit(): void {
this.localUserService.destroyUser();
this.loginForm = this.fb.group({
  email: ['', Validators.required],
  password: ['', Validators.required]
});
  }
onSubmit(){
this.authService.SignIn(this.loginForm.value.email, this.loginForm.value.password);
}
}
