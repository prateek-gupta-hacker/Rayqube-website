import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view-work',
  templateUrl: './view-work.component.html',
  styleUrls: ['./view-work.component.scss']
})
export class ViewWorkComponent implements OnInit {
  workData:any;
  id:any;
  imageurl;
  constructor(private shared : SharedService, private router: Router) { 
    this.imageurl = this.shared.imageUrl;
  }

  ngOnInit() {
    this.shared.getApi(this.shared.baseUrl+"work").subscribe(data => {
      console.log(JSON.parse(JSON.stringify(data)));
      this.workData = JSON.parse(JSON.stringify(data));
      console.log(this.workData);
    });
  }
  viewWork(id){
    this.shared.workId = id;
    console.log(id);
    this.router.navigate(['/work']);
  }
  editWork(id){
    this.shared.workId = id;
    console.log(id);
    this.router.navigate(['/edit-work']);
  }
}
