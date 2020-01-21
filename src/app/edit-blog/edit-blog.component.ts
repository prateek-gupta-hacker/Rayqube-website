import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit {
  id:any;
  dataForUpdate:any;
  title:any;
  date:any;
  blogContent: any;
  constructor(private shared : SharedService, private router: Router) { this.id = this.shared.blogId; }

  ngOnInit() {
    
    
    var data = {
      "_id": this.id
    }
    this.shared.postApi(this.shared.baseUrl+ "allblogs/" + this.id, data).subscribe(data => {
      console.log(JSON.parse(JSON.stringify(data)));
      this.dataForUpdate = JSON.parse(JSON.stringify(data));
      console.log(this.dataForUpdate);
      this.title = this.dataForUpdate.title;
      this.date = this.dataForUpdate.date;
      this.blogContent = this.dataForUpdate.blogContent;
    });
  }
  update(){
    var data = {
      "title": this.title,
      "date": this.date,
      "blogContent": this.blogContent
    }
    console.log(data);
    this.shared.putApi(this.shared.baseUrl+this.id, data).subscribe(data => {
      console.log(JSON.stringify(data));
      const jsonData = JSON.parse(JSON.stringify(data));
  });
  this.router.navigate(['/blogs-list']);
  }
}
