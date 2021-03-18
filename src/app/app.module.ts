import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RegisteruserComponent } from './registeruser/registeruser.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { HomeComponent } from './home/home.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

import { AdminModule } from './admin/admin.module';
import { ViewproductComponent } from './viewproduct/viewproduct.component';
import { UsercartComponent } from './usercart/usercart.component';
@NgModule({
  declarations: [
    AppComponent,
    RegisteruserComponent,
    UserLoginComponent,
    HomeComponent,
    UserdashboardComponent,
    ResetpasswordComponent,
    ViewproductComponent,
    UsercartComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
