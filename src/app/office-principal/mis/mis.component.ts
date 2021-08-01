import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import { MisService } from 'src/app/shared/services/mis.service';
import { LocalUserService } from 'src/app/shared/services/localUser.serice';
import { User } from 'src/app/shared/services/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mis',
  templateUrl: './mis.component.html',
  styleUrls: ['./mis.component.css']
})
export class MisComponent implements OnInit {
  loading = false;
  Mis: any[];
  user: User;
  searchText;

  constructor(private location: Location,
              private mis: MisService,
              private router: Router,
              private localUserService: LocalUserService) {
    this.user = this.localUserService.getUser();
   }
  ngOnInit(): void {
    this.getMis();
  }
  getMis(){
    this.loading = true;
    this.mis.getMisList().subscribe(res => {
      const miss = res.map( e => {
        return {
          id: e.payload.doc.id,
          data: e.payload.doc.data()
        } as any;
      });
      this.Mis = miss.filter(o => o.data.participants.some(({ email }) => email === this.user.email)).reverse();
      console.log(this.Mis);
      this.loading = false;
    });
  }
  previewTemplate(template){
    this.router.navigate(['admin/template'], { state: { template} });
  }
  routeBack(){
    this.location.back();
  }

}
