import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductComponent } from './addproduct/addproduct.component';

import { AdminComponent } from './admin.component';
import { ViewproductsComponent } from './viewproducts/viewproducts.component';

const routes: Routes = [
  { path: '', component: AdminComponent,children:[
    {path:"addproduct",component:AddproductComponent},
    {path:"viewproducts",component:ViewproductsComponent},
    {path:"",redirectTo:"/viewproducts",pathMatch:"full"}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
