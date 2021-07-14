import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Template } from 'src/app/shared/services/templates';
import { TemplateService } from 'src/app/shared/services/templates.service';
import { Location } from '@angular/common';
import { ConfirmedValidator } from 'src/app/shared/helpers/confirmpasswordvalidator';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: Template;
  percentage: number;
  userForm: FormGroup;
  constructor(private location: Location,
     private authService: AuthService,
     private fb: FormBuilder,
     private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.initForm()
  }
  initForm() {
    this.userForm = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        password: ['', [Validators.required]],
        confirm_password: ['', [Validators.required]],
        role: ['student'],
        mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    },
        {
            validator: ConfirmedValidator('password', 'confirm_password')
        }
    )}
  routeBack(){
    this.location.back()
  }
  onSubmit(): void {
    if(this.userForm.valid){
      this.authService.SignUp(this.userForm.value);
      // this.toastr.success(`${this.userForm.value.name} created successfully.`);
    }
    else{  
this.toastr.warning('Please checkout all fields.')
    } 
  }
}
