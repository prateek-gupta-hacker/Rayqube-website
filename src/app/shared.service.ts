import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  blogId:any;
  workId:any;
  teamId:any;
  loggedIn;
  baseUrl = "http://localhost:1338/api/";
  fileUrl = "http://localhost:1338/file/";
  imageUrl = "http://localhost:1338/uploads/";
  constructor(private http: HttpClient, private router: Router) { 
    
  }
  
  getApi(apiURL) {
    return this.http.get(apiURL);
  }
  postApi(apiURL, data) {
    return (this.http.post(apiURL, data));
  }
  putApi(apiURL, data){
    return this.http.put(apiURL, data);
  }
  deleteApi(apiURL, data){
    return (this.http.delete(apiURL, data));
  }

loginChecker(){
  if(localStorage.getItem("email") === null){
  return false;
  }else{
    return true;
  }
}
  valueStorage(email){
    localStorage.setItem("email", email);
  }
  clearStorage(){
    localStorage.clear();
  }
}