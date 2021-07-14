import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public userForm: FormGroup;
  Users: any[];

  constructor(
    public userService: UserService,
    public formBuilder: FormBuilder,
    public router: Router
  ) { 
    this.userForm = this.formBuilder.group({
      name: [''],
      email: [''],
      contact: ['']
    })      
  }

  ngOnInit(): void {
    
  }

  onSubmit() {
    this.userService.createUser(this.userForm.value);
    // this.router.navigate(['list-users']); 
   };
}
