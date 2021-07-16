import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { OfficePrincipalRoutingModule } from './office-principal-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TemplatesComponent } from './templates/templates.component';
import { PrincipalComponent } from './principal/principal.component';
import { DepartmentComponent } from './department/department.component';
import { UsersComponent } from './users/users.component';
import { SingleUserComponent } from './users/single-user/single-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { MisComponent } from './mis/mis.component';
import { CreateTemplatesComponent } from './templates/create-templates/create-templates.component';
import { PreviewTemplateComponent } from './templates/preview-template/preview-template.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { CreateDepartmentComponent } from './department/create-department/create-department.component';
import { SingleDepartmentComponent } from './department/single-department/single-department.component';
import { DepartmentUserCreateComponent } from './department/department-user-create/department-user-create.component';
import { CreatePrincipalComponent } from './create-principal/create-principal.component';
import { NgxLoadingModule } from 'ngx-loading';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [DashboardComponent, TemplatesComponent, PrincipalComponent, DepartmentComponent, UsersComponent, SingleUserComponent, UserCreateComponent, MisComponent, CreateTemplatesComponent, PreviewTemplateComponent, CreateDepartmentComponent, SingleDepartmentComponent, DepartmentUserCreateComponent, CreatePrincipalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    Ng2SearchPipeModule,
    OfficePrincipalRoutingModule,
    NgxDocViewerModule,
    NgxLoadingModule.forRoot({}),
  ]
})
export class OfficePrincipalModule { }
