import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styles: [
  ]
})
export class SectionsComponent implements OnInit {

  public listPost: Post[] = [];

  constructor( private postService: PostService ) { }

  ngOnInit(): void {
    this.getListPost();
  }

  getListPost() {
    this.postService.getListPost()
                    .subscribe(({ posts }) => {
                              //console.log(posts);
                              this.listPost = posts;
                            });
  }

}
