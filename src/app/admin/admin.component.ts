import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private r:Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.r.navigateByUrl("/home");
  }

  addproduct(){
    this.r.navigateByUrl("/addproduct");
  }

  viewproducts(){
    this.r.navigateByUrl("/viewproducts");
  }
}
