import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { LocalUserService } from 'src/app/shared/services/localUser.serice';
import { User } from 'src/app/shared/services/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
user: User;
  constructor(private router: Router, private location: Location, private localUserService: LocalUserService) {
   this.user = this.localUserService.getUser();
   console.log(this.user);
   }
  ngOnInit(): void {
  }
  route(path: string){
    if (path != 'profile'){
      this.router.navigate([`admin/${path}`]);
    }
    else{
      this.router.navigate([`profile/${this.user.uid}`]);
    }
  }
  routeBack(){
    console.log('route back called');
    this.location.back();
  }

}
