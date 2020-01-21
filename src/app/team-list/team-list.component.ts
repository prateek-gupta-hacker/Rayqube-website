import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  imageurl;
  teamData:any;
  constructor(private shared : SharedService, private router: Router) { 
    this.shared.getApi(this.shared.baseUrl+"/teamMembers").subscribe(data => {
      console.log(JSON.parse(JSON.stringify(data)));
      this.teamData = JSON.parse(JSON.stringify(data));
      
      console.log(this.teamData);
    });
    this.imageurl = this.shared.imageUrl;
   }

  ngOnInit() {
    this.shared.getApi(this.shared.baseUrl+"/teamMembers").subscribe(data => {
      console.log(JSON.parse(JSON.stringify(data)));
      this.teamData = JSON.parse(JSON.stringify(data));
      
      console.log(this.teamData);
    });
  }
  editMember(id){
    this.shared.teamId = id;
    console.log(id); 
    this.router.navigate(['/edit-member']);
  }

}
