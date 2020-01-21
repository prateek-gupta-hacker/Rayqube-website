import { Component, NgModule } from '@angular/core';
import { AppRoutingModule,  } from '../app/app-routing/app-routing.module';
import {Router} from '@angular/router';
import {SharedService} from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
// @NgModule({
  
//   imports: [
    
//       AppRoutingModule,

//   ],

// })
export class AppComponent {
  title = 'Rayqube-Dashboard';
  pageDecider:boolean = false;
  constructor(private shared: SharedService, private router: Router){
    if(this.shared.loginChecker()){
      
      this.pageDecider = true;
      
      this.router.navigate(['view-work']);
      if(window.location.href.includes('login')){
        
      }
    }else{
      this.pageDecider = false;
      this.router.navigate(['login']);
    }
    console.log(this.pageDecider);
    
  }
  ngDoCheck(){
    
  }
}
