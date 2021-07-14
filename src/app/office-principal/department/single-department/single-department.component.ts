import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/user.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-single-department',
  templateUrl: './single-department.component.html',
  styleUrls: ['./single-department.component.css']
})
export class SingleDepartmentComponent implements OnInit {

  Users: any[] =[];
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  department: string
  dtTrigger: Subject<any> = new Subject();
  constructor(private userService: UserService, 
    private router: Router, 
    private location: Location,
    private route: ActivatedRoute,) { 
    this.department = this.route.snapshot.params.department;
  }
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
    this.getUsers()
  }
  getUsers() {
    this.userService.getUserList().subscribe(res => {
      const users = res.map( e => {
        return {
          id: e.payload.doc.id,
          data:e.payload.doc.data()
        } as any;
      })
      this.Users = users.filter(s => s.data.department === this.department);

      console.log(this.Users);
      this.dtTrigger.next()
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
    this.router.navigate([`admin/department/user-create/${this.department}`])
  }
  routeBack(){
    this.location.back()
  }

}
