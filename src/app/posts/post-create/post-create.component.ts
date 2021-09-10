import { Component } from '@angular/core';


@Component({
  templateUrl: './post-create.component.html',
  selector: 'app-post-create'
})
export class PostCreateComponent{

  newPost = '';

  onAddPost(postInput: HTMLTextAreaElement){
    this.newPost = postInput.value
  }
}
