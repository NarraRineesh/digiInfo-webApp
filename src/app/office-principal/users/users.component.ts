import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { User } from 'src/app/shared/services/user';
import { UserService } from 'src/app/user.service';
import {Location} from '@angular/common';
import { LocalUserService } from 'src/app/shared/services/localUser.serice';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  Users: any[] =[];
  
  user: User;
  searchText;
  public loading= false
  constructor(private userService: UserService,
     private router: Router,
     private localUserService: LocalUserService,
      private location: Location) { }
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
            this.Users = users.filter(s => s.data.role === 'student');

      console.log(users);
      this.loading = false
    }); 
     
  }
 
  onListItemClick(id: string){
    console.log(id);
    // if(this.user.role === 'admin'){
    this.router.navigate(['admin/user/'+ id]);
    // }
  }
  addUser(){
    this.router.navigate(['admin/user-create'])
  }
  routeBack(){
    this.location.back()
  }
}
