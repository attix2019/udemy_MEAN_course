import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
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
  pageSize : number = 10;
  currentPage : number = 1;
  totalPosts = 100;
  postsPerPage = 5;
  pageSizeOptions = [1,2,5,10];

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
    this.postService.getPosts( this.currentPage, this.pageSize);
  }

  onEdit(){

  }

  onDelete(postId : string ){
    this.postService.deletePost(postId);
  }

  onPageSettingChanged(event : PageEvent){
// length: 100
// pageIndex: 0
// pageSize: 2
// previousPageIndex: 0
    console.log(event)
    this.currentPage = event.pageIndex+1;
    this.pageSize = event.pageSize;
    this.postService.getPosts(this.currentPage, this.pageSize);
  }
}
