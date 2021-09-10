import { Component } from '@angular/core';


@Component({
  templateUrl: './post-create.component.html',
  selector: 'app-post-create'
})
export class PostCreateComponent{
  onAddPost(){
    alert("you just clicked create post button")
  }
}
