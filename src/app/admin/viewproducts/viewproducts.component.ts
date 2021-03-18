import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-viewproducts',
  templateUrl: './viewproducts.component.html',
  styleUrls: ['./viewproducts.component.css']
})
export class ViewproductsComponent implements OnInit {
  productObj = [];
  constructor(private us:UserService,private r:Router) { }

  ngOnInit(): void {
    
    this.us.getproducts().subscribe(
      res => {
        this.productObj = res["message"];
        console.log(this.productObj);
      },
      err => {
        alert("Something went wrong!");
        console.log(err);
      }
    )
  }

  
  Delete(ind){
    this.productObj.splice(ind,1);
  }
}
