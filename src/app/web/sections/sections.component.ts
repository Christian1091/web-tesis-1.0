import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: [
    './sections.component.css'
  ]
})
export class SectionsComponent implements OnInit {

  public listPost: Post[] = [];

  public contPost: any = {};

  public id: string;

  constructor( private postService: PostService,
               private activatedRoute: ActivatedRoute) {
                this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
                }

  ngOnInit(): void {
    this.getListPost();
  }

  getListPost() {
    this.postService.getListPost()
                    .subscribe(({ post }) => {
                              //console.log(posts);
                              this.listPost = post;
                            });
  }


}
