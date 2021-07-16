import { Component, OnInit } from '@angular/core';
import{ Location} from '@angular/common'
import { TemplateService } from 'src/app/shared/services/templates.service';
import { Template } from 'src/app/shared/services/templates';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
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
  eulaContent: any;
  constructor(private location: Location,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer, 
     private templateService: TemplateService,
     private fb: FormBuilder) { 
      
     }

  ngOnInit(): void {
    fetch('/assets/temp.html').then(res => res.text()).then(data => {
      this.eulaContent = this.sanitizer.bypassSecurityTrustHtml(data);
    })
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
  exportHTML(){
    this.loading = true
    var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
         "xmlns:w='urn:schemas-microsoft-com:office:word' "+
         "xmlns='http://www.w3.org/TR/REC-html40'>"+
         "<head><meta charset='utf-8'><title>Email from DigiInfo</title></head><body>";
    var footer = "</body></html>";
    var sourceHTML = header+document.getElementById("template").innerHTML+footer;
    var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    var fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'template_sample.doc';
    fileDownload.click();
    this.loading = false
    document.body.removeChild(fileDownload);
 }

}
