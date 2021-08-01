import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guard/auth.guard';
import { CreatePrincipalComponent } from './create-principal/create-principal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateDepartmentComponent } from './department/create-department/create-department.component';
import { DepartmentUserCreateComponent } from './department/department-user-create/department-user-create.component';
import { DepartmentComponent } from './department/department.component';
import { SingleDepartmentComponent } from './department/single-department/single-department.component';
import { MisComponent } from './mis/mis.component';
import { PrincipalComponent } from './principal/principal.component';
import { CreateTemplatesComponent } from './templates/create-templates/create-templates.component';
import { EditorComponent } from './templates/editor/editor.component';
import { PreviewTemplateComponent } from './templates/preview-template/preview-template.component';
import { TemplatesComponent } from './templates/templates.component';
import { SingleUserComponent } from './users/single-user/single-user.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', redirectTo: 'oop-dashboard', pathMatch: 'full' },
  { path: 'oop-dashboard', component: DashboardComponent,
   canActivate:[AuthGuard] 
  },
  {path: 'templates', component: TemplatesComponent,
   canActivate:[AuthGuard]
  },
  {path: 'template', component: PreviewTemplateComponent,
   canActivate:[AuthGuard]
  },
  {path: 'add-template', component: CreateTemplatesComponent,
   canActivate:[AuthGuard]
  },
  {path: 'edit-template', component: EditorComponent,
   canActivate:[AuthGuard]
  },
  {path: 'principal', component: PrincipalComponent,
   canActivate:[AuthGuard]
  },
  {path: 'add-principal', component: CreatePrincipalComponent,
canActivate: [AuthGuard]
},
  {path: 'department', component: DepartmentComponent,
   canActivate:[AuthGuard]
  },
  {path: 'single-department/:department', component: SingleDepartmentComponent,
   canActivate:[AuthGuard]
  },
  {path: 'department/user-create/:department', component: DepartmentUserCreateComponent,
   canActivate:[AuthGuard]
  },
  {path: 'create-department', component: CreateDepartmentComponent,
   canActivate:[AuthGuard]
  },
  {path: 'mis', component: MisComponent,
   canActivate:[AuthGuard]
  },
  {path: 'users', component: UsersComponent,
   canActivate:[AuthGuard]
  },
  {path: 'user/:id', component: SingleUserComponent,
   canActivate:[AuthGuard]
  },
  {path: 'user-create', component: UserCreateComponent,
   canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficePrincipalRoutingModule { }
