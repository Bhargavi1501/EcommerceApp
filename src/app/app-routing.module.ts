import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserLoginComponent } from './user-login/user-login.component';
import { RegisteruserComponent } from './registeruser/registeruser.component';
import { HomeComponent } from './home/home.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { ResetpasswordComponent} from './resetpassword/resetpassword.component';
import { ViewproductComponent} from './viewproduct/viewproduct.component';
import { UsercartComponent } from './usercart/usercart.component';
const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"registeruser",component:RegisteruserComponent},
  {path:"userlogin",component:UserLoginComponent},
  {path:"userdashboard",component:UserdashboardComponent},
  {path:"resetpassword",component:ResetpasswordComponent},
  {path:"viewproduct/:pno",component:ViewproductComponent},
  {path:"usercart",component:UsercartComponent},
  {path:"",redirectTo:"/home",pathMatch:"full"},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
