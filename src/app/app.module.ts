import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { BlogsViewComponent } from './blogs-view/blogs-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ViewBlogComponent } from './view-blog/view-blog.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { ViewWorkComponent } from './view-work/view-work.component';
import { EditWorkComponent } from './edit-work/edit-work.component';
import { WorkComponent } from './work/work.component';
import { CreateWorkComponent } from './create-work/create-work.component';
import { TeamListComponent } from './team-list/team-list.component';
import { CreateMemberComponent } from './create-member/create-member.component';
import { EditMemberComponent } from './edit-member/edit-member.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateBlogComponent,
    BlogsViewComponent,
    ViewBlogComponent,
    EditBlogComponent,
    ViewWorkComponent,
    EditWorkComponent,
    WorkComponent,
    CreateWorkComponent,
    TeamListComponent,
    CreateMemberComponent,
    EditMemberComponent,
    SidebarComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
