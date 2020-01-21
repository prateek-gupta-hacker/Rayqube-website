import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.scss']
})
export class EditMemberComponent implements OnInit {
 id:any;
 memberName:any;
 designation:any;
 dataForUpdate:any;
  constructor(private shared : SharedService, private router: Router) {this.id = this.shared.teamId; }

  ngOnInit() {
    var data = {
      "_id": this.id
    }
    this.shared.postApi(this.shared.baseUrl+ "teamMembers/" + this.id, data).subscribe(data => {
      console.log(JSON.parse(JSON.stringify(data)));
      this.dataForUpdate = JSON.parse(JSON.stringify(data));
      console.log(this.dataForUpdate);
      this.memberName = this.dataForUpdate.memberName;
      this.designation = this.dataForUpdate.designation;
     
    });
  }
  update(){
    var data = {
      "memberName": this.memberName,
      "designation": this.designation,
    }
    console.log(data);
    this.shared.putApi(this.shared.baseUrl+ "teamMembers/" +this.id, data).subscribe(data => {
      console.log(JSON.stringify(data));
      const jsonData = JSON.parse(JSON.stringify(data));
  });
  this.router.navigate(['/team-list']);
  }
}
