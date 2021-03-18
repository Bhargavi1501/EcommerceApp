import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.css']
})
export class RegisteruserComponent implements OnInit {

  constructor(private us:UserService,private r:Router) { }

  ngOnInit(): void {
  }

  onSubmit(formRef:any){
    let userObj = formRef.value;
    console.log(userObj);

    this.us.createUser(userObj).subscribe(
      res=>{
        if(res["message"] == "user existed"){
          alert("Username is already existed..choose another");
        }
        if(res["message"] == "user created"){
          alert("Registration succesfull");

          //navigate to login component
          this.r.navigateByUrl("/userlogin");
        }
      },
      err=>{
        console.log("Something went wrong",err);
      }
    )
  }
}
