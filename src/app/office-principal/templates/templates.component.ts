import { Component, OnInit } from '@angular/core';
import{Location} from '@angular/common'
import { Router } from '@angular/router';
import { TemplateService } from 'src/app/shared/services/templates.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
  templates: any[];

  constructor(private location: Location,
     private router: Router,
     private templateService: TemplateService) { }

  ngOnInit(): void {
    this.templateService.getFiles().snapshotChanges().pipe(
      map(changes =>
        // store the key
        changes.map(c => ({ key: c.payload.key, val:c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.templates = fileUploads;
      console.log(this.templates);
      
    });
   
  }
  addTemplate(){
this.router.navigate(['admin/add-template'])
  }
  routeBack(){
    this.location.back()
  }

}
