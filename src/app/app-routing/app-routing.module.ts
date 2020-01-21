import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BlogsViewComponent } from '../blogs-view/blogs-view.component';
import { CreateBlogComponent } from '../create-blog/create-blog.component';
import { ViewBlogComponent } from '../view-blog/view-blog.component';
import { EditBlogComponent } from '../edit-blog/edit-blog.component';
import { ViewWorkComponent } from '../view-work/view-work.component';
import { EditWorkComponent } from '../edit-work/edit-work.component';
import { CreateWorkComponent } from '../create-work/create-work.component';
import { TeamListComponent } from '../team-list/team-list.component';
import { CreateMemberComponent } from '../create-member/create-member.component';
import { EditMemberComponent } from '../edit-member/edit-member.component';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';



const routes: Routes = [
  
  { path: 'blogs-list', component: BlogsViewComponent },
  { path: 'blog', component: ViewBlogComponent },
  { path: 'edit-blog', component: EditBlogComponent },
  { path: 'create-blog', component: CreateBlogComponent },
  { path: 'view-work', component: ViewWorkComponent },
  { path: 'edit-work', component: EditWorkComponent },
  { path: 'create-work', component: CreateWorkComponent },
  { path: 'team-list', component: TeamListComponent },
  { path: 'create-member', component: CreateMemberComponent },
  { path: 'edit-member', component: EditMemberComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    
    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// export const routingComponents = [ BlogsViewComponent, CreateBlogComponent ];