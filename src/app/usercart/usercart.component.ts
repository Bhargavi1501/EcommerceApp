import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usercart',
  templateUrl: './usercart.component.html',
  styleUrls: ['./usercart.component.css']
})
export class UsercartComponent implements OnInit {
  productObj=[];
  cartSize = this.productObj.length;
  
  constructor(private us:UserService,private r:Router,private ar: ActivatedRoute) { }
  username;
  ngOnInit(): void {
    this.username = localStorage.getItem("username");
    this.getCards();
   // console.log("cartSize:",this.cartSize)
    
  }

  getCards(){
    console.log("inside getCards()")
    this.us.getdetails(this.username).subscribe(
      res=>{
        this.productObj = res["message"];
        console.log(this.productObj);
      },
      err=>{
        alert("Something Went wrong!");
        console.log(err);
      }
    )
  }

  back(){
    this.r.navigateByUrl("/userdashboard");
  }

  
}
