import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';


class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit {
  blogTitle:any;
  date:any;
  blogDescription:any;
  form: FormGroup;
  imagename;
  constructor(private shared : SharedService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      avatar: [''],
    });
  }
  blogSubmission(){
    console.log(this.blogTitle + " " + this.date + " " + this.blogDescription);
    const formData = new FormData();
    formData.append("avatar", this.form.get('avatar').value);
    // formData.append("title", this.blogTitle);
    // formData.append("date", this.date);
    // formData.append("blogContent", this.blogDescription);
    var data = {
      "title": this.blogTitle,
      "date": this.date,
      "blogContent": this.blogDescription,
      "imagename": this.imagename,
      
    }
    
    console.log(data);
    this.shared.postApi(this.shared.baseUrl + 'upload', formData).subscribe(data => {
      console.log(JSON.stringify(data));
      const jsonData = JSON.parse(JSON.stringify(data));
    });
    this.shared.postApi(this.shared.baseUrl + 'allblogs', data).subscribe(data => {
      console.log(JSON.stringify(data));
      const jsonData = JSON.parse(JSON.stringify(data));
    });
  
  // this.router.navigate(['/blogs-list']);
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    this.imagename = file.name;
    this.form.get('avatar').setValue(file);
  }
}