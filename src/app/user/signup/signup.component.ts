import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  onSubmit(){
    this.authService.SignUp(this.signupForm.value)
    }

}
