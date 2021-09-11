import { Component } from '@angular/core';
import { Post } from './posts/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  storedPosts:Post[] = [];

  onPostAdded(post: Post){
    this.storedPosts.push(post);
  }
}

/*
todo：输入框加标签，form的改造，add以后重置form，编辑和删除post的按钮
*/
