import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private us: UserService,private r: Router) { }

  ngOnInit(): void {
  }
  onSubmit(formRef) {

    let userCredObj = formRef.value;
    console.log(userCredObj);
    //if user
    if (userCredObj.usertype == "user") {
      this.us.loginUser(userCredObj).subscribe(
        res => {
          if (res["message"] == "success") {
            //store tiken and username in browser's localstorage
            localStorage.setItem("token", res["signedToken"]);
            localStorage.setItem("username", res["username"]);
            alert("Successfully Logged in!");
            //navigate to userdashboard
            this.r.navigateByUrl("/userdashboard");
            
          }
          else {
            alert(res["message"])
          }
        },
        err => {
          console.log("Something went wrong", err);
        }
      )
    }

    if (userCredObj.usertype == "admin") {
      if (userCredObj.username == "admin" && userCredObj.password == "admin") {
        //navigate to admin dashboard
        this.r.navigateByUrl("/admin");
      }
      else{
        alert("Wrong Password!");
      }
    }
  }

  register(){
    this.r.navigateByUrl("/registeruser");
  }

  forgetPassword(){
    this.r.navigateByUrl("/resetpassword");
  }
}
