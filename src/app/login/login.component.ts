import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email;
  password;
  constructor(private shared : SharedService, private router: Router) { 
    if(window.location.href.includes('login')){
      if(this.shared.loggedIn){
        this.router.navigate(['view-work']);
      }
    }
  }

  ngOnInit() {
  }
  login(){
    var data = {
      'email': this.email,
      'password': this.password
    }
    this.shared.postApi( this.shared.baseUrl + 'login', data).subscribe(data => {
      console.log(JSON.parse(JSON.stringify(data)));
      
     var status = JSON.parse(JSON.stringify(data));
      if(status.STATUS == "success"){
        this.shared.valueStorage(this.email);
        location.reload();
      }
    });
  }
}
