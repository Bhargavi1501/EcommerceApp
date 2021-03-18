import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

import {  RouterModule } from '@angular/router';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ViewproductsComponent } from './viewproducts/viewproducts.component';

@NgModule({
  declarations: [AdminComponent, AddproductComponent, ViewproductsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class AdminModule { }
