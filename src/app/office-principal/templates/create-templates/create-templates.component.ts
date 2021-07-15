import { Component, OnInit } from '@angular/core';
import{ Location} from '@angular/common'
import { TemplateService } from 'src/app/shared/services/templates.service';
import { Template } from 'src/app/shared/services/templates';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-templates',
  templateUrl: './create-templates.component.html',
  styleUrls: ['./create-templates.component.css']
})
export class CreateTemplatesComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: Template;
  percentage: number;
  templateForm: FormGroup;
  public loading = false;
  constructor(private location: Location,
    private toastr: ToastrService, 
     private templateService: TemplateService,
     private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm()
  }
  myForm() {
    this.templateForm = this.fb.group({
    name: ['', Validators.required ],
    file: ['', Validators.required]
    });
 }
  routeBack(){
    this.location.back()
  }
  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.loading = true;
    if(this.templateForm.valid){
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.currentFileUpload = new Template(file);
    this.templateService.pushFileToStorage(this.currentFileUpload,this.templateForm.value.name ).subscribe(
      percentage => {
        this.toastr.success("template created success");
        this.loading = false;
        this.templateForm.reset();
        // this.percentage = Math.round(percentage);
      },
      error => {
        console.log(error);
        this.toastr.warning(error.message);
        this.loading = false;
      }
    );
    }else{
      this.loading = false
      this.toastr.warning('Check out all fields!');
      
    }
  }

}
