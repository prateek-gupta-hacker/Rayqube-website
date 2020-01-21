import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-create-work',
  templateUrl: './create-work.component.html',
  styleUrls: ['./create-work.component.scss']
})
export class CreateWorkComponent implements OnInit {
  workplace:any;
  name_of_event:any;
  date_of_event:any;
  description:any;
  form: FormGroup;
  imagename;
  videoLink;
  constructor(private shared : SharedService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      avatar: [''],
    });
  }
  
  workSubmission(){
    console.log(this.name_of_event + " " + this.workplace + " " + this.description);
    const formData = new FormData();
    formData.append("avatar", this.form.get('avatar').value);
    var data = {
      "workplace": this.workplace,
      "date_of_event": this.date_of_event,
      "name_of_event": this.name_of_event,
      "description": this.description,
      "imagename": this.imagename,
      "videoLink": this.videoLink
    }
    console.log(data);
    this.shared.postApi(this.shared.baseUrl + 'upload', formData).subscribe(data => {
      console.log(JSON.stringify(data));
      const jsonData = JSON.parse(JSON.stringify(data));
    });
    this.shared.postApi(this.shared.baseUrl+"work", data).subscribe(data => {
      console.log(JSON.stringify(data));
      const jsonData = JSON.parse(JSON.stringify(data));
    });
      setTimeout(()=>{    
        this.router.navigate(['/view-work']);
    }, 1000);
  
  }
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    this.imagename = file.name;
    this.form.get('avatar').setValue(file);
  }
}
