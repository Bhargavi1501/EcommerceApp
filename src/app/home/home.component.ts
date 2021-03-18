import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productObj = [];
  cardObj;
  rupee: number = 100;
  username;
  count;
  cartSize;
  constructor(private us: UserService, private r: Router) { }
  
  ngOnInit(): void {
    this.username = localStorage.getItem("username");
    this.us.getproducts().subscribe(
      res => {
        this.productObj = res["message"];
        //console.log(this.productObj);
      },
      err => {
        alert("Something went wrong!");
        console.log(err);
      }
    )
    this.getCartSize();
  }

  viewproduct(name) {
    this.r.navigate(['/viewproduct', name]);
  }

  addToCart(productObj) {
    if(this.username){
      productObj.username = this.username;
      console.log(this.username);
      this.us.addProductToCart(productObj).subscribe(
        res => {
          if (res["message"] == "card inserted") {
            alert("Added to cart successfully!");
            this.count = this.getCartSize();
          }
          else if(res["message"] == "card already existed"){
            alert("Product already added to your cart, Select another product");
          }
        },
        err => {
          alert("Something went wrong!");
          console.log(err);
        }
      )
    }
    else{
      confirm("You must login first to add product to your cart");
      this.r.navigateByUrl("/userlogin");
    }
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
    })

  }

}