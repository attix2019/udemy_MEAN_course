import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post.model';
import { PostService } from '../posts.service';

@Component({
  templateUrl: './post-create.component.html',
  selector: 'app-post-create',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit{

  enteredContent = '';
  enteredTitle = '';
  postService : PostService;
  private mode = 'create';
  private postId :any;
  post:Post;
  isLoading = false;

  @Output() postCreated = new EventEmitter<Post>();

  onAddPost(){
    var post: Post = {
      id : '',
      title: this.enteredTitle,
      content: this.enteredContent
    }
    // this.postCreated.emit(post);
    if(this.mode === 'create'){
      this.postService.addPost( post);
    }else {
      this.postService.updatePost(this.post.id, this.enteredTitle, this.enteredContent);
    }
  }

  constructor(postService: PostService, private route: ActivatedRoute){
    this.postService = postService;
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap)=>{
      if( paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPostById(this.postId).subscribe((result : Post)=>{
          this.post = result;
          console.log(this.post);
          this.enteredTitle = this.post.title;
          this.enteredContent = this.post.content;
          this.isLoading = false;
        });
      }else{
        this.mode = 'create';
        this.postId = null;
      }
    })
  }
}
