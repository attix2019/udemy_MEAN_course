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
  private post:Post;

  @Output() postCreated = new EventEmitter<Post>();

  onAddPost(){
    var post: Post = {
      id : '',
      title: this.enteredTitle,
      content: this.enteredContent
    }
    // this.postCreated.emit(post);
    this.postService.addPost( post);
  }

  constructor(postService: PostService, private route: ActivatedRoute){
    this.postService = postService;
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap)=>{
      if( paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.post = this.postService.getPostById(this.postId);
      }else{
        this.mode = 'create';
        this.postId = null;
      }
    })
  }
}
