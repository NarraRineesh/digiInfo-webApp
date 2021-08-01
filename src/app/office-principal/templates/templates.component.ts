import { Component, OnInit } from '@angular/core';
import{Location} from '@angular/common'
import { Router } from '@angular/router';
import { TemplateService } from 'src/app/shared/services/templates.service';
import { map } from 'rxjs/operators';
import { LocalUserService } from 'src/app/shared/services/localUser.serice';
import { User } from 'src/app/shared/services/user';
import { Template } from 'src/app/shared/services/templates';
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
  waitingTemplates: Template[] =[];
  approvedTemplates: Template[]= [];
  constructor(private location: Location,
     private router: Router,
     private localUserService: LocalUserService,
     private templateService: TemplateService) {
       this.user = this.localUserService.getUser()
      }

  ngOnInit(): void {
    this.loading = true
    if(this.user.role === 'admin' || this.user.role === 'principal'){
      this.templateService.getFiles().snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() as any }))
        )
      ).subscribe(fileUploads => {
        this.templates = fileUploads.filter(item => item.department === 'All').reverse();
        console.log(this.templates);
        this.loading= false
      });
    }
    if(this.user.role === 'a-hod'){
      this.templateService.getFiles().snapshotChanges().pipe(
        map(changes =>
          
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() as any }))
        )
      ).subscribe(fileUploads => {
        const data = fileUploads;
        
        this.templates =data
        .filter(item => item.department === this.user.department).reverse()
        console.log(this.templates);
        this.loading= false
      });
    }
    if(this.user.role === 'hod'){
      this.templateService.getFiles().snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() as any }))
        )
      ).subscribe(fileUploads => {
        const data = fileUploads;
        this.templates =data.filter(item => item.department === this.user.department).reverse();
        console.log(this.templates);
       this.waitingTemplates = this.templates.filter(item => item.waitingForApproval === true  && item.approved === false)
       this.approvedTemplates = this.templates.filter(item => item.waitingForApproval === true && item.approved === true)
        this.loading= false
      });
    }
    if(this.user.role === 'principal'){
      this.templateService.getFiles().snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() as any }))
        )
      ).subscribe(fileUploads => {
        const data = fileUploads;
        this.templates =data.filter(item => item.department === 'All').reverse();
        console.log(this.templates);
       this.waitingTemplates = this.templates.filter(item => item.waitingForApproval === true  && item.approved === false)
       this.approvedTemplates = this.templates.filter(item => item.waitingForApproval === true && item.approved === true)
        this.loading= false
      });
    }
    
    
   
  }
  addTemplate(){
this.router.navigate(['admin/add-template'])
  }
  editTemplate(){
    this.router.navigate(['admin/edit-template']) 
  }
  routeBack(){
    this.location.back()
  }
  previewTemplate(template){
    this.router.navigate(['admin/template'], { state: { template: template} })
  }

}
