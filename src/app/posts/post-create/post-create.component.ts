import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../posts.service';

@Component({
  templateUrl: './post-create.component.html',
  selector: 'app-post-create',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent{

  enteredContent = '';
  enteredTitle = '';
  postService : PostService;

  @Output() postCreated = new EventEmitter<Post>();

  onAddPost(){
    var post: Post = {
      title: this.enteredTitle,
      content: this.enteredContent
    }
    // this.postCreated.emit(post);
    this.postService.addPost( post);
  }

  constructor(postService: PostService){
    this.postService = postService;
  }
}
