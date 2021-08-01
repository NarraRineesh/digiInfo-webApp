import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { User } from 'src/app/shared/services/user';
import { LocalUserService } from 'src/app/shared/services/localUser.serice';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  Users: any;
  userName: any;
  userEmail: any;
  userMobile: any;
  hideAddBUtton = false;
  user: User;

  constructor(
    private location: Location,
    private router: Router,
    private userService: UserService,
    private localUserService: LocalUserService
  ) { }

  ngOnInit(): void {
    this.user = this.localUserService.getUser();
    this.userService.getUserList().subscribe(res => {
      const users = res.map( e => {
        return {
          id: e.payload.doc.id,
          data: e.payload.doc.data()
        } as any;
      });
      this.Users = users.filter(s => s.data.role === 'principal');
      if (this.Users.length > 0){
        this.hideAddBUtton = true;
      }
      console.log(this.Users);
      this.userName = this.Users[0].data.displayName;
      this.userEmail = this.Users[0].data.email;
      this.userMobile = this.Users[0].data.mobile;
  });
}
  addPrincipal(){
    this.router.navigate(['admin/add-principal']);
  }
  routeBack(){
    this.location.back();
  }
}
