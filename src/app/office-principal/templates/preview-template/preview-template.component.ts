import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from 'src/app/shared/services/department.service';
import { LocalUserService } from 'src/app/shared/services/localUser.serice';
import { MisService } from 'src/app/shared/services/mis.service';
import { TemplateService } from 'src/app/shared/services/templates.service';
import { User } from 'src/app/shared/services/user';
import { UserService } from 'src/app/user.service';
import { Iparticipant, Template } from '../template';
import{Location} from '@angular/common'


@Component({
  selector: 'app-preview-template',
  templateUrl: './preview-template.component.html',
  styleUrls: ['./preview-template.component.css']
})
export class PreviewTemplateComponent implements OnInit {
  template: Template;
  departments: any[] =[];
  participantsSelected: Iparticipant[] = [];
  classCheck: boolean[] = [];
  user: User;
  users: any[] =[];

  constructor(private router:Router,
    private location: Location,
    private departmentService: DepartmentService,
    private mis: MisService,
    private userService: UserService,
    private templateService: TemplateService,
    private locaUserService: LocalUserService) { 
    this.template  = this.router.getCurrentNavigation().extras.state.template;
    this.user = this.locaUserService.getUser()
  }

  ngOnInit(): void {
    console.log(this.template)
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
    this.getAllUsers()
    
  }
  getAllUsers(){
    this.userService.getUserList().subscribe(res => {
      const users = res.map( e => {
        return {
          id: e.payload.doc.id,
          data:e.payload.doc.data()
        } as any;
      })
      if(this.user.role === 'admin'){
        this.users = users;
      }
      if(this.user.role === 'a-hod'){
        this.users = users.filter(s => s.data.department === this.user.department);
      }
    }) 

  }
  sendTo(){
    this.template.waitingForApproval=true;
    this.template.participants = this.participantsSelected
    this.templateService.updateTemplate(this.template.key, this.template)
  }
  selectedClass(name, index) {
    this.classCheck[index] = !this.classCheck[index];
    if (this.classCheck[index] == true) {
      console.log("add called",name,index);
      const users = this.users.filter(item => item.data.department === name)
      users.forEach(element => {
        const data ={
          email: element.data.email,
          view: false
        }
        this.participantsSelected.push(data)
        
      });
    } else {
      console.log("remove called");
      const users = this.users.filter(item => item.data.department === name)
      users.forEach(element => {
        for (let i = 0; i < this.participantsSelected.length; i++) {
          if (element.data.email == this.participantsSelected[i].email) {
            this.participantsSelected.splice(i);
          }
        }
        
      });
    }
    console.log(this.participantsSelected);

  }
  selectStream(name, index){
    this.classCheck[index] = !this.classCheck[index];
    if (this.classCheck[index] == true) {
      console.log("add called",name,index);
      const users = this.users.filter(item => item.data.role === name)
      users.forEach(element => {
        const data ={
          email: element.data.email,
          view: false
        }
        this.participantsSelected.push(data)
      });
    } else {
      console.log("remove called");
      const users = this.users.filter(item => item.data.role === name)
      users.forEach(element => {
        console.log(element);
        
        for (let i = 0; i < this.participantsSelected.length; i++) {
          if (element.data.email == this.participantsSelected[i].email) {
            this.participantsSelected.splice(i);
          }
        }
      });
    }
    console.log(this.participantsSelected);
    
  }
  ApproveTemplate(){
    this.template.waitingForApproval=true
    this.template.approved= true
    this.templateService.updateTemplate(this.template.key, this.template)
    this.mis.createMIS(this.template)
  }
  routeBack(){
    this.location.back()
  }
}
