import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/services/user';
import { UserService } from 'src/app/user.service';
import {Location} from '@angular/common'
import { LocalUserService } from 'src/app/shared/services/localUser.serice';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  User: User;
  userId: string;
  userName: string;
  userEmail: string;
  userRole: string;
  showCase: boolean = false
  constructor(private userService: UserService,
     private route: ActivatedRoute,
     private localUserService: LocalUserService,
     private location: Location,
     private router: Router,private toastr: ToastrService, ) { 
    this.userId = this.route.snapshot.params.id;
    console.log("single user",this.userId);
  }

  ngOnInit(): void {
    this.userService.getUserDoc(this.userId).subscribe(res => {
      this.User = res as any
      console.log(this.User)
      this.userName= this.User.displayName;
      this.userEmail = this.User.email;
      this.userRole = this.User.role
      
    }); 
  }
  editUser(){
    this.showCase = true
  }
  updateUser(){
    this.userService.updateUser(this.User.uid,this.User);
    this.toastr.success(`${this.userName} updated sucess`)
  }
  routeBack(){
    this.location.back();
  }
  logout(){
    this.localUserService.destroyUser();
    this.router.navigate(['/login'])
  }

}
