import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import { TemplateService } from 'src/app/shared/services/templates.service';
import { Template } from 'src/app/shared/services/templates';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalUserService } from 'src/app/shared/services/localUser.serice';
import { User } from 'src/app/shared/services/user';
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
  department = 'All';
  user: User;
  constructor(private location: Location,
              private toastr: ToastrService,
              private sanitizer: DomSanitizer,
              private locaUserService: LocalUserService,
              private templateService: TemplateService,
              private fb: FormBuilder) {
      this.user = this.locaUserService.getUser();
     }

  ngOnInit(): void {
    fetch('/assets/temp.html').then(res => res.text()).then(data => {
      this.eulaContent = this.sanitizer.bypassSecurityTrustHtml(data);
    });
    this.myForm();
  }
  myForm() {
    this.templateForm = this.fb.group({
    name: ['', Validators.required ],
    file: ['', Validators.required]
    });
 }
  routeBack(){
    this.location.back();
  }
  selectFile(event): void {
    this.selectedFiles = event.target.files;

  }

  upload(): void {
    this.loading = true;
    if (this.templateForm.valid){
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.currentFileUpload = new Template(file);
    if (this.user.role === 'admin'){
      this.templateService.pushFileToStorage(this.currentFileUpload, this.templateForm.value.name, this.department ).subscribe(
        percentage => {
          this.toastr.success('template created success');
          this.loading = false;
          this.templateForm.reset();
        },
        error => {
          console.log(error);
          this.toastr.warning(error.message);
          this.loading = false;
        }
      );
    }
    if (this.user.role === 'a-hod'){
      this.templateService.pushFileToStorage(this.currentFileUpload, this.templateForm.value.name, this.user.department ).subscribe(
        percentage => {
          this.toastr.success('template created success');
          this.loading = false;
          this.templateForm.reset();
        },
        error => {
          console.log(error);
          this.toastr.warning(error.message);
          this.loading = false;
        }
      );
    }
    }else{
      this.loading = false;
      this.toastr.warning('Check out all fields!');

    }
  }
  exportHTML(){
    this.loading = true;
    let header = '<html xmlns:o=\'urn:schemas-microsoft-com:office:office\' ' +
         'xmlns:w=\'urn:schemas-microsoft-com:office:word\' ' +
         'xmlns=\'http://www.w3.org/TR/REC-html40\'>' +
         '<head><meta charset=\'utf-8\'><title>Email from DigiInfo</title></head><body>';
    let footer = '</body></html>';
    let sourceHTML = header + document.getElementById('template').innerHTML + footer;
    let source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    let fileDownload = document.createElement('a');
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'template_sample.doc';
    fileDownload.click();
    this.loading = false;
    document.body.removeChild(fileDownload);
 }

}
