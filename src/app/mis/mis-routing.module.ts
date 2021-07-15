import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guard/auth.guard';
import { MisSubComponent } from './mis/mis.component';

const routes: Routes = [
  { path: '', redirectTo: 'mis-sub', pathMatch: 'full' },
  { path: 'mis-sub', component: MisSubComponent,
   canActivate:[AuthGuard] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MISRoutingModule { }
