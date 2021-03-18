import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {
  username;
  count;
  cartSize;
  constructor(private r:Router,private us:UserService) { }

  ngOnInit(): void {
   this.username = localStorage.getItem("username");
   this.getCartSize();
  }

  logout(){
    //clear localstorage
    localStorage.clear();

    //navigate to home page
    this.r.navigateByUrl("/home");
  }

  userCart(){
    this.r.navigateByUrl("/usercart");
  }

  getCartSize(){
    let uname = localStorage.getItem("username");
    this.us.getdetails(uname).subscribe(
      res=>{
        this.cartSize = res["message"].length;
        console.log(this.cartSize);
        this.count = this.cartSize;
        return this.cartSize;
      },
      err=>{
        alert("Something Went wrong!");
        console.log(err);
      }
    )
  }
  
}
