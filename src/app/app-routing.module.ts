import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';
import { LoginComponent } from './user/login/login-signup.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { RoleCardsComponent } from './components/role-cards/role-cards.component';
import { OfficePrincipalModule } from './office-principal/office-principal.module';
import { MISModule } from './mis/mis.module';
import { DepartmentModule } from './department/department.module';
import { ProfileComponent } from './user/profile/profile.component';


const routes: Routes = [
  { path: '', redirectTo: 'roles', pathMatch: 'full' },
  { path: 'roles', component: RoleCardsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  {
    path: 'editor',
    canActivate:[AuthGuard], data: {roles: ["editor"]},
    loadChildren: () => OfficePrincipalModule
},
{
  path: 'admin',
  canActivate:[AuthGuard], data: {roles: ["admin"]},
  loadChildren: () => OfficePrincipalModule
},
{
  path: 'subscriber',
  canActivate:[AuthGuard], data: {roles: ["subscriber"]},
  loadChildren: () => MISModule
},
];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  declarations: []
})

export class AppRoutingModule { }