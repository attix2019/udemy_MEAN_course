import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';

@Component({
  templateUrl: './post-create.component.html',
  selector: 'app-post-create',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent{

  enteredContent = '';
  enteredTitle = '';


  @Output() postCreated = new EventEmitter<Post>();

  onAddPost(){
    var post: Post = {
      title: this.enteredTitle,
      content: this.enteredContent
    }
    this.postCreated.emit(post);
  }
}
