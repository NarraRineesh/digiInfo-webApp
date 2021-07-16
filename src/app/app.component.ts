import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalUserService } from './shared/services/localUser.serice';
import { User } from './shared/services/user';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User;
  constructor(private localService: LocalUserService, private router: Router){}
  ngOnInit(){
   this.user = this.localService.getUser()
   if(this.user.uid = null){
     this.router.navigate(['/login'])
   }
   else{
     if(this.user.role === 'student'){
     this.router.navigate(['/subscriber'])
     }
     else{
       this.router.navigate(['/admin'])
     }
   }
  }
}
