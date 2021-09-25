import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post.model';
import { PostService } from '../posts.service';
import { mimeType } from './mime-type.validator';

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
  form : FormGroup;
  imagePreviewUrl : string;

  @Output() postCreated = new EventEmitter<Post>();

  onAddPost(){
    if(this.form.invalid){
      return;
    }
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
    this.form.reset();
  }

  constructor(postService: PostService, private route: ActivatedRoute){
    this.postService = postService;
  }

  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image')?.updateValueAndValidity();
    console.log(file);
    console.log(this.form);
    const reader = new FileReader();
    reader.onload = ()=>{
      this.imagePreviewUrl = (reader.result as string);
    }
    reader.readAsDataURL(file);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'title': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      'content' :new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      'image' :new FormControl(null, {validators: [Validators.required], asyncValidators:[mimeType]} )
    });
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
          this.post.id = this.postId;
          this.isLoading = false;
          //转为响应式表单以后
          this.form.setValue({'title': this.post.title, 'content': this.post.content});
        });
      }else{
        this.mode = 'create';
        this.postId = null;
      }
    })
  }
}
