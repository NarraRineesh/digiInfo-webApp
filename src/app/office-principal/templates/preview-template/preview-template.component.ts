import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from 'src/app/shared/services/department.service';
import { Template } from '../template';

@Component({
  selector: 'app-preview-template',
  templateUrl: './preview-template.component.html',
  styleUrls: ['./preview-template.component.css']
})
export class PreviewTemplateComponent implements OnInit {
  template: Template;
  departments: any[] =[];
  participantsSelected: any[] = [];
  classCheck: boolean[] = [];

  constructor(private router:Router,
    private departmentService: DepartmentService) { 
    this.template  = this.router.getCurrentNavigation().extras.state.template;
    console.log(this.template);
    
  }

  ngOnInit(): void {
    this.departmentService.getDepartmentList().subscribe(res => {
      this.departments = res.map( e => {
        return {
          id: e.payload.doc.id,
          data:e.payload.doc.data()
        } as any;
      })
      console.log(this.departments);
    });
    for (const id of this.departments) {
        this.classCheck.push(false);
    }
    
  }
  selectedClass(name) {
    // this.classCheck[index] = !this.classCheck[index];
    // if (this.classCheck[index] == true) {
    //   console.log("add called");
    //   this.classesList.forEach(element => {
    //     if (element._id == id) {
    //       element.students.forEach(data => {
    //         const isAvailable = this.participantsSelected.findIndex(e => e.name == data.name)
    //         if (isAvailable == -1)
    //           this.participantsSelected.push(data)
    //       });
    //     }
    //   });
    // } else {
    //   console.log("remove called");
    //   this.classesList[index].students.forEach(element => {
    //     for (let i = 0; i < this.participantsSelected.length; i++) {
    //       if (element._id == this.participantsSelected[i]._id) {
    //         this.participantsSelected.splice(i);
    //       }
    //     }
        
    //   });
    // }
  }

}
