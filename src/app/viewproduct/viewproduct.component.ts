import { splitClasses } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {
  productObj;

  constructor(private us: UserService, private ar: ActivatedRoute) { }

  ngOnInit(): void {
    this.productOverview();
  }

  productOverview(){
    this.ar.params.subscribe(
      
      params => {
        let productname = params["name"];

        this.us.getproductByName(productname).subscribe(
          res => {
            this.productObj = res["message"];
            console.log(this.productObj);
          },
          err => {
            alert("Something went wrong!");
            console.log(err)
          }
        )
      }
    )
  }

}
