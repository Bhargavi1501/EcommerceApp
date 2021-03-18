import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  file: File;
  incomingfile(event) {
    this.file = event.target.files[0];
  }
  constructor(private us: UserService, private r: Router) { }

  ngOnInit(): void {
  }
  onSubmit(formRef: any) {
    let productObj = formRef.value;
    console.log(productObj);
    let formData = new FormData();
    //adding image and other data to ForData object
    formData.append('photo', this.file, this.file.name);

    formData.append("productObj", JSON.stringify(productObj))
    //append() can only take the data in string format so convert the file datawhich is in binary to string


    this.us.createProduct(formData).subscribe(
      res => {
        if (res["message"] == "product existed") {
          alert("product is already existed..");
        }
        if (res["message"] == "product added") {
          alert("product added successfully");

          //clear form after adding object
          formRef.reset();

        }
      },
      err => {
        alert("Something went wrong in user creation");
        console.log(err);
      }
    )
  }
}
