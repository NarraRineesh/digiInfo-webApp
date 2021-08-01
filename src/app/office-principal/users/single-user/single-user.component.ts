import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/services/user';
import { UserService } from 'src/app/user.service';
import { Location } from '@angular/common';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css']
})
export class SingleUserComponent implements OnInit {
  User: User;
  userId: string;
  userName: string;
  userEmail: string;
  userRole: number;
  showCase: boolean = false
  constructor(private userService: UserService,
     private route: ActivatedRoute,
     private location: Location,
     private fns: AngularFireFunctions,
     private router: Router,private toastr: ToastrService, ) { 
    this.userId = this.route.snapshot.params.id;
    console.log("single user",this.userId);
  }

  ngOnInit(): void {
    this.userService.getUserDoc(this.userId).subscribe(res => {
      this.User = res as any
    }); 
  }
  editUser(){
    this.showCase = true
  }
  updateUser(){
    console.log(this.User);
    this.userService.updateUser(this.userId,this.User);
    this.toastr.success(`${this.User.displayName} updated success`)
  }
  deleteUser(){
    this.userService.deleteUser(this.User);
    this.toastr.success(`${this.User.displayName} deleted success`)
    this.location.back();
  }
  addMessage(): Observable<any> {
    const addMessage = this.fns.httpsCallable('updateEmail'); 
    return addMessage({email: "test"});
  }
  routeBack(){
    this.location.back();
  }

}
