import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  visible = "notVisible";
  constructor(private shared : SharedService, private router: Router) { 
    if(window.location.href.includes('login')){
      this.visible = "notVisible";
      this.router.navigate(['view-work']);
    }else{
      this.visible = "visible";
    }
  }

  ngOnInit() {
  }
  logout(){
    
    this.shared.clearStorage();
    this.router.navigate(['login']);
    location.reload();
  }
  ngDoCheck(){
    if(window.location.href.includes('login')){
      this.visible = "notVisible";
    }else{
      this.visible = "visible";
    }
  }
}
