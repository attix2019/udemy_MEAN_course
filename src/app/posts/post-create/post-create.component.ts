import { Component } from '@angular/core';


@Component({
  templateUrl: './post-create.component.html',
  selector: 'app-post-create'
})
export class PostCreateComponent{

  newPost = '';
  enteredValue = '';

  onAddPost(postInput: HTMLTextAreaElement){
    this.newPost = postInput.value;
  }

  onAddPostVia2WayBinding(){
    this.newPost = this.enteredValue;
  }
}
