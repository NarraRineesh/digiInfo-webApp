import { Component, OnInit } from '@angular/core';
import{ Location} from '@angular/common'
import { Router } from '@angular/router';
import { Department } from 'src/app/shared/services/department';
import { DepartmentService } from 'src/app/shared/services/department.service';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  departments: Department[] = [];

  constructor(private location: Location,
     private router: Router,
     private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.getDepartmentData();
  }
  addDepartment(){
    this.router.navigate(['admin/create-department'])
  }
  routeBack(){
    this.location.back()
  }
  getDepartmentData(){
    this.departmentService.getDepartmentList().subscribe(res => {
      this.departments = res.map( e => {
        return {
          id: e.payload.doc.id,
          data:e.payload.doc.data()
        } as any;
      })
      console.log(this.departments);
     
    }); 
  }
  openSingleDepartment(department: string){
console.log(department);
this.router.navigate([`admin/single-department/${department}`])
  }

}
