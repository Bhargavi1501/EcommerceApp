import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  username = localStorage.getItem("username");
  constructor(private hc:HttpClient) { }

  createUser(userObj):Observable<any>{
    return this.hc.post("/user/register",userObj);
  }

  loginUser(userCredObj):Observable<any>{
    return this.hc.post("/user/login",userCredObj);
  }

  changePassword(userObj):Observable<any>{
    return this.hc.post("/user/resetpassword",userObj);
  }

  createProduct(productObj):Observable<any>{
    return this.hc.post("/product/createproduct",productObj);
  }

  getproducts():Observable<any>{
    return this.hc.get("/product/getproducts");
  }

  getproductByName(productname):Observable<any>{
    return this.hc.get("/product/getproduct/"+productname);
  }

  addProductToCart(productObj):Observable<any>{
    return this.hc.post("/card/addToCart",productObj);
  }

  getcards(username):Observable<any>{
    return this.hc.get("/card/getcards/"+username);
  }

  getdetails(username):Observable<any>{
    return this.hc.get("/card/getdetails/"+username);
  }
  
}
