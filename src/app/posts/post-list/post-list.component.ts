import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent{

  @Input() posts:any = [];

  // posts:any[] = [
  //   {"title":"title1","content":"content1"},
  //   {"title":"title2","content":"content2"},
  //   {"title":"title3","content":"content3"}
  // ]


}
