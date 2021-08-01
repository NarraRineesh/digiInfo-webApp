import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import { Router } from '@angular/router';
import { Department } from 'src/app/shared/services/department';
import { DepartmentService } from 'src/app/shared/services/department.service';
import { LocalUserService } from 'src/app/shared/services/localUser.serice';
import { User } from 'src/app/shared/services/user';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  departments: Department[] = [];
  user: User;
  searchText;
  loading = false;
  constructor(private location: Location,
              private router: Router,
              private localUserService: LocalUserService,
              private departmentService: DepartmentService) { }

  ngOnInit(): void {
   this.user = this.localUserService.getUser();
   this.getDepartmentData();
  }
  addDepartment(){
    this.router.navigate(['admin/create-department']);
  }
  routeBack(){
    this.location.back();
  }
  getDepartmentData(){
    this.loading = true;
    if (this.user.role === 'admin' || this.user.role === 'principal'){
      this.departmentService.getDepartmentList().subscribe(res => {
        this.departments = res.map( e => {
          return {
            id: e.payload.doc.id,
            data: e.payload.doc.data()
          } as any;
        });
        console.log(this.departments);
        this.loading = false;
      });
    }
    if (this.user.role === 'a-hod' || this.user.role === 'hod'){
      this.departmentService.getDepartmentList().subscribe(res => {
        this.departments = res.map( e => {
          return {
            id: e.payload.doc.id,
            data: e.payload.doc.data()
          } as any;
        }).filter(item => item.data.name === this.user.department);
        console.log(this.departments);
        this.loading = false;
      });
    }

  }
  openSingleDepartment(department: string){
console.log(department);
this.router.navigate([`admin/single-department/${department}`]);
  }

}
