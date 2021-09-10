import { Component } from '@angular/core';


@Component({
  templateUrl: './post-create.component.html',
  selector: 'app-post-create',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent{

  newPost = '';
  enteredValue = '';

  onAddPost(){
    this.newPost = this.enteredValue;
  }

}
