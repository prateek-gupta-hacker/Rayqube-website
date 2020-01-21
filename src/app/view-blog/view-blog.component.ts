import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.scss']
})
export class ViewBlogComponent implements OnInit {
  id:any;
  dataForUpdate:any;
  constructor(private shared : SharedService, private router: Router) { }

  ngOnInit() {
    this.id = this.shared.blogId;
    var data = {
      "_id": this.id
    }
    this.shared.postApi(this.shared.baseUrl + "allblogs/", data).subscribe(data => {
      console.log(JSON.parse(JSON.stringify(data)));
      this.dataForUpdate = JSON.parse(JSON.stringify(data));
      console.log(this.dataForUpdate);
    });
  }
}
