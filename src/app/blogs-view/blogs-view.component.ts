import { Component, OnInit } from '@angular/core';
import {blogModel} from '../models/blog-model';
import {SharedService} from '../shared.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-blogs-view',
  templateUrl: './blogs-view.component.html',
  styleUrls: ['./blogs-view.component.scss']
})
export class BlogsViewComponent implements OnInit {
  blogsData:any;
  imageurl;
  constructor(private shared : SharedService, private router: Router) { 
    this.imageurl = this.shared.imageUrl;
  }

  ngOnInit() {
    this.shared.getApi(this.shared.baseUrl + "allblogs").subscribe(data => {
      console.log(JSON.parse(JSON.stringify(data)));
      this.blogsData = JSON.parse(JSON.stringify(data));
      console.log(this.blogsData);
    });
  }
  viewBlog(id){
    this.shared.blogId = id;
    console.log(id);
    this.router.navigate(['/blog']);
  }
  editBlog(id){
    this.shared.blogId = id;
    console.log(id);
    this.router.navigate(['/edit-blog']);
  }
}
