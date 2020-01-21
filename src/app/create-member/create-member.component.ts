import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-create-member',
  templateUrl: './create-member.component.html',
  styleUrls: ['./create-member.component.scss']
})
export class CreateMemberComponent implements OnInit {
  memberName:any;
  designation:any;
  form: FormGroup;
  imagename;
  constructor(private shared : SharedService, private router: Router, private formBuilder: FormBuilder) { } 

  ngOnInit() {
    this.form = this.formBuilder.group({
      avatar: [''],
    });
  }


  memberSubmission(){
    console.log(this.memberName + " " + this.designation);
    const formData = new FormData();
    formData.append("avatar", this.form.get('avatar').value);
    var data = {
      "memberName": this.memberName,
      "designation": this.designation,
      "imagename": this.imagename,
    }
    console.log(data);
    this.shared.postApi(this.shared.baseUrl + 'upload', formData).subscribe(data => {
      console.log(JSON.stringify(data));
      const jsonData = JSON.parse(JSON.stringify(data));
    });
    this.shared.postApi(this.shared.baseUrl+"teamMembers", data).subscribe(data => {
      console.log(JSON.stringify(data));
      const jsonData = JSON.parse(JSON.stringify(data));
    });
    setTimeout(()=>{    
        this.router.navigate(['/team-list']);
    }, 1000);
    
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    this.imagename = file.name;
    this.form.get('avatar').setValue(file);
  }
}
