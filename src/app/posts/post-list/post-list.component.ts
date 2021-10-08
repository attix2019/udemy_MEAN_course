import { AuthService } from './../../auth/auth.service';
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
  isAuthed = false;
  posts:Post[] = [];
  postService : PostService;
  authService : AuthService
  private postSub: Subscription;
  private authStatusSub: Subscription;
  isLoading = false;
  pageSize : number = 10;
  currentPage : number = 1;
  totalPosts = 100;
  postsPerPage = 5;
  pageSizeOptions = [1,2,5,10];

  constructor(postService : PostService, authService : AuthService) {
    this.postService = postService;
    this.authService = authService;
    this.isLoading = true;
    this.postSub = this.postService.getPostUpdateListener()
    .subscribe((result : {posts: Post[], total : number})=>{
      this.isLoading = false;
      this.posts = result.posts;
      this.totalPosts = result.total;
    });
    this.isAuthed = this.authService.getAuthStatusForList();
    this.authStatusSub = this.authService.getAuthStatusListener()
    .subscribe(result =>{
      this.isAuthed = result;
    })
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
    this.authStatusSub.unsubscribe();
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
