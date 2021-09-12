import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Post } from "./post.model";
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated  = new Subject<Post[]>();

  constructor(private http: HttpClient){}

  getPosts(){
    this.http.get<Post[]>("http://localhost:3000/api/posts")
    .subscribe((posts)=>{
      this.posts= posts;
      this.postsUpdated.next([...this.posts]);
    })
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(post: Post){
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
