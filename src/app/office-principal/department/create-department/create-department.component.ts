import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Location } from '@angular/common';
import { Template } from 'src/app/shared/services/templates';
import { TemplateService } from 'src/app/shared/services/templates.service';
import { DepartmentService } from 'src/app/shared/services/department.service';
@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css']
})
export class CreateDepartmentComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: Template;
  percentage: number;
  departmentForm: FormGroup;
  imageSrc: string | ArrayBuffer;
  constructor(private location: Location,
              private departmentService: DepartmentService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm();
  }
  myForm() {
    this.departmentForm = this.fb.group({
    name: ['', Validators.required ]
    });
 }
  routeBack(){
    this.location.back();
  }

  upload(): void {
    const data = {
      name: this.departmentForm.value.name
    };
    this.departmentService.createDepartment(data);
    this.departmentForm.reset();
  }
}
