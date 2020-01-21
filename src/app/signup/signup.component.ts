import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  email;
  password;
  constructor(private shared : SharedService, private router: Router) { }

  ngOnInit() {
  }
  signup(){
    var logindata = {
      'email': this.email,
      'password': this.password
    }
    this.shared.postApi( this.shared.baseUrl + 'signUp', logindata).subscribe(data => {
      console.log(JSON.parse(JSON.stringify(data)));
    });
  }

}
