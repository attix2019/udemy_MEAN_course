import { Component, Input } from "@angular/core";
import { Post } from "../post.model";
import { PostService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent{

  @Input() posts:Post[] = [];

  postService : PostService;

  constructor(postService : PostService) {
    this.postService = postService;
  }

}
