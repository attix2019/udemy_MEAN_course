import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs/operators'
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class PostService {
  private posts: any[] = [];
  private postsUpdated  = new Subject<{posts: Post[], total : number}>();
  totalPosts: number = 0;

  constructor(private http: HttpClient, private router: Router){}

  getPosts(currentPage : number, pageSize : number){
    let param = '';
    if(currentPage && pageSize){
      param = `?pagesize=${pageSize}&page=${currentPage}`;
    }
    this.http.get<any>("http://localhost:3000/api/posts" + param)
    .pipe(map((originalResponse)=>{
      return {
        posts: originalResponse.posts.map( (post: { title: string; content: string; _id: string; imagePath: string})=>{
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath : post.imagePath
          }
        }),
        total: originalResponse.total
      }
    }))
    .subscribe((transformedResult)=>{
      console.log(transformedResult)
      this.totalPosts = transformedResult.total;
      this.posts= transformedResult.posts;
      this.postsUpdated.next({
        posts:[...this.posts],
        total:transformedResult.total
      });
    })
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(post: Post, image: File){
    const postDaata = new FormData();
    postDaata.append("title", post.title);
    postDaata.append("content", post.content);
    postDaata.append("image", image, post.title);
    this.http.post<Post>("http://localhost:3000/api/posts", postDaata)
    .subscribe((responseData)=>{
      console.log(responseData);
      const retPost: Post = {id: responseData.id,
        title:responseData.title,
        content:responseData.content,
        imagePath:responseData.imagePath};
      this.posts.push(retPost);
      // post.id = responseData;
      this.totalPosts += 1;
      this.postsUpdated.next({
        posts:[...this.posts],
        total: this.totalPosts,
      });
      this.router.navigate(['/']);
    });
  }

  deletePost(postId : string){
    this.http.delete("http://localhost:3000/api/posts/" + postId)
    .subscribe(()=>{
      const updatedPosts = this.posts.filter( (post:Post) => {
        return post.id !== postId;
      });
      this.posts = updatedPosts;
      this.totalPosts -= 1;
      this.postsUpdated.next({
        posts:[...this.posts],
        total: this.totalPosts
      });
    })
  }

  // HttpClient.get() 默认情况下把响应体当做无类型的 JSON 对象进行返回。 如果指定了可选的模板类型 <Hero[]>，就会给返回你一个类型化的对象。
  // 在this.http.get后指定类型
  getPostById(postId : string){
    return this.http.get<Post>("http://localhost:3000/api/posts/" + postId);
  }

  updatePost(postId : string, title :string, content: string, image: File|string){
    // const post = new Post() 用这样的方法声明就会有问题，关于typescript的类型的知识需要再深入了解一下
    const post : Post = {id:'', title:title, content:content, imagePath:null}
    let postData;
    if(typeof(image) === 'object'){
      postData = new FormData();
      postData.append("id", postId);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    }else{
      postData = {
        id: postId,
        title : title,
        content: content,
        imagePaath: image
      }
    }
    this.http.put<Post>("http://localhost:3000/api/posts/" + postId, postData)
    .subscribe( response=>{
      console.log(response);
      this.router.navigate(['/']);
    });
  }

}
