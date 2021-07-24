import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/user.service';
import { Location } from '@angular/common';
import { LocalUserService } from 'src/app/shared/services/localUser.serice';
import { User } from 'src/app/shared/services/user';
@Component({
  selector: 'app-single-department',
  templateUrl: './single-department.component.html',
  styleUrls: ['./single-department.component.css']
})
export class SingleDepartmentComponent implements OnInit {

  Users: any[] =[];
  department: string
  user: User;
  loading = false;
  searchText;
  constructor(private userService: UserService, 
    private router: Router, 
    private localUserService: LocalUserService,
    private location: Location,
    private route: ActivatedRoute,) { 
    this.department = this.route.snapshot.params.department;
  }
  ngOnInit(): void {
    
    this.user = this.localUserService.getUser()
    this.getUsers()
  }
  getUsers() {
    this.loading = true
    this.userService.getUserList().subscribe(res => {
      const users = res.map( e => {
        return {
          id: e.payload.doc.id,
          data:e.payload.doc.data()
        } as any;
      })
      this.Users = users.filter(s => s.data.department === this.department);
this.loading= false
      console.log(this.Users);
      
    }); 
     
  }
  
  onListItemClick(id: string){
    console.log(id);
    if(this.user.role === 'admin'){
      this.router.navigate(['admin/user/'+ id])
    }
  }
  addUser(){
    this.router.navigate([`admin/department/user-create/${this.department}`])
  }
  routeBack(){
    this.location.back()
  }

}
