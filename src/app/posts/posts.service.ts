import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs/operators'

@Injectable({providedIn: 'root'})
export class PostService {
  private posts: any[] = [];
  private postsUpdated  = new Subject<Post[]>();

  constructor(private http: HttpClient){}

  getPosts(){
    this.http.get<any>("http://localhost:3000/api/posts")
    .pipe(map((originalPosts)=>{
      return originalPosts.map( (post: { title: string; content: string; _id: string; })=>{
        return {
          title: post.title,
          content: post.content,
          id: post._id
        }
      })
    }))
    .subscribe((transformedPosts)=>{
      this.posts= transformedPosts;
      this.postsUpdated.next([...this.posts]);
    })
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(post: Post){
    this.posts.push(post);
    this.http.post<string>("http://localhost:3000/api/posts",post)
    .subscribe((responseData)=>{
      console.log(responseData);
      post.id = responseData;
      this.postsUpdated.next([...this.posts]);
    });
  }

  deletePost(postId : string){
    this.http.delete("http://localhost:3000/api/posts/" + postId)
    .subscribe(()=>{
      const updatedPosts = this.posts.filter( (post:Post) => {
        return post.id !== postId;
      });
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    })
  }

  getPostById(postId : string){
    const post = this.posts.find((post)=>{
      return post.id == postId;
    })
    return {...post};
  }

  updatePost(postId : string, title :string, content: string){
    // const post = new Post() 用这样的方法声明就会有问题，关于typescript的类型的知识需要再深入了解一下
    const post : Post = {id:'', title:title, content:content}
    this.http.put<Post>("http://localhost:3000/api/posts/" + postId, post)
    .subscribe( response=>{
      console.log(response);
    });
  }

}
