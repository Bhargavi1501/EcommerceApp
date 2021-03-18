import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  status: boolean = false;
  constructor(private us: UserService, private r: Router) { }

  ngOnInit(): void {
  }


  onSubmit(ref:any) {

    let userObj = ref.value;
    console.log(userObj);
    if (userObj.newpassword === userObj.confirmpassword) {
      this.us.changePassword(userObj).subscribe(
        res => {
          if (res["message"] == "success") {
            //navigate to login page
            this.r.navigateByUrl("/userlogin");
            alert("Password updated successfully!")
          }
        },
        err => {
          alert("Something went wrong in password reset");
          console.log(err);
        }
      )
    }
    else {
      this.status = true;
    }
  }
}
