import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-work',
  templateUrl: './edit-work.component.html',
  styleUrls: ['./edit-work.component.scss']
})
export class EditWorkComponent implements OnInit {
  id:any;
  date_of_event:any;
  description:any;
  name_of_event:any;
  workplace:any;
  dataForUpdate:any;
  constructor(private shared : SharedService, private router: Router) {this.id = this.shared.workId; }

  ngOnInit() {
    var data = {
      "_id": this.id
    }
    this.shared.postApi(this.shared.baseUrl+ "work/" + this.id, data).subscribe(data => {
      console.log(JSON.parse(JSON.stringify(data)));
      this.dataForUpdate = JSON.parse(JSON.stringify(data));
      console.log(this.dataForUpdate);
      this.date_of_event = this.dataForUpdate.date_of_event;
      this.description = this.dataForUpdate.description;
      this.name_of_event = this.dataForUpdate.name_of_event;
      this.workplace = this.dataForUpdate.workplace;
     
    });
  }
  update(){
    var data = {
      "date_of_event": this.date_of_event,
      "description": this.description,
      "name_of_event": this.name_of_event,
      "workplace": this.workplace,
      
    }
    console.log(data);
    this.shared.putApi(this.shared.baseUrl+"work/"+this.id, data).subscribe(data => {
      console.log(JSON.stringify(data));
      const jsonData = JSON.parse(JSON.stringify(data));
  });
  this.router.navigate(['/view-work']);
  }
}
