import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Post } from "../post.model";
import { PostService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{

  posts:Post[] = [];
  postService : PostService;
  private postSub: Subscription;
  isLoading = false;
  pageSize : number;
  currentPage : number;
  totalPosts : number;

  constructor(postService : PostService) {
    this.postService = postService;
    this.isLoading = true;
    this.postSub = this.postService.getPostUpdateListener()
    .subscribe((posts : Post[])=>{
      this.isLoading = false;
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
  }

  ngOnInit(): void {
    this.postService.getPosts();
  }

  onEdit(){

  }

  onDelete(postId : string ){
    this.postService.deletePost(postId);
  }
}
