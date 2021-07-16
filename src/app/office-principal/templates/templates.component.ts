import { Component, OnInit } from '@angular/core';
import{Location} from '@angular/common'
import { Router } from '@angular/router';
import { TemplateService } from 'src/app/shared/services/templates.service';
import { map } from 'rxjs/operators';
import { LocalUserService } from 'src/app/shared/services/localUser.serice';
import { User } from 'src/app/shared/services/user';
@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
  templates: any[] =[];
  user: User;
  searchText;
  public loading = false;
  constructor(private location: Location,
     private router: Router,
     private localUserService: LocalUserService,
     private templateService: TemplateService) { }

  ngOnInit(): void {
    this.user = this.localUserService.getUser();
    this.loading = true
    this.templateService.getFiles().snapshotChanges().pipe(
      map(changes =>
        // store the key
        changes.map(c => ({ key: c.payload.key, val:c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.templates = fileUploads;
      console.log(this.templates);
      this.loading= false
    });
   
  }
  addTemplate(){
this.router.navigate(['admin/add-template'])
  }
  routeBack(){
    this.location.back()
  }
  previewTemplate(template){
    this.router.navigate(['admin/template'], { state: { template: template} })
  }

}
