import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { User } from 'src/app/shared/services/user';
import { UserService } from 'src/app/user.service';
import {Location} from '@angular/common';
import { LocalUserService } from 'src/app/shared/services/localUser.serice';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  Users: any[] =[];
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  user: User;
  public loading= false
  constructor(private userService: UserService,
     private router: Router,
     private localUserService: LocalUserService,
      private location: Location) { }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full',
      pageLength: 10,
      dom: 'frtip',
      searching: false,
      language: {
        "search": "",
        searchPlaceholder: "Search...",
        info: "showing _END_ out of _TOTAL_ Users Found",
        infoEmpty: "0 Users Found",
      },
      oLanguage: {
        "oPaginate": {
          "sFirst": "First", // This is the link to the first page
          "sPrevious": "<i class='fa fa-arrow-left' aria-hidden='true'></i>", // This is the link to the previous page
          "sNext": "<i class='fa fa-arrow-right' aria-hidden='true'></i>", // This is the link to the next page
          "sLast": "Last" // This is the link to the last page
        }
      }
    };
    this.user = this.localUserService.getUser()
    this.getUsers()
  }
  getUsers() {
    this.loading = true
    this.userService.getUserList().subscribe(res => {
      const users = res.map( e => {
        return {
          id: e.payload.doc.id,
          data:e.payload.doc.data()
        } as any;
      })
            this.Users = users.filter(s => s.data.role === 'student');

      console.log(users);
      this.dtTrigger.next();
      this.loading = false
    }); 
     
  }
  search(term) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.search(term).draw()
        });
  }
  onListItemClick(id: string){
    console.log(id);
    this.router.navigate(['admin/user/'+ id])
  }
  addUser(){
    this.router.navigate(['admin/user-create'])
  }
  routeBack(){
    this.location.back()
  }
}
