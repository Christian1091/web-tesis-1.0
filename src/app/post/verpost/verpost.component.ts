import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-verpost',
  templateUrl: './verpost.component.html',
  styleUrls: [
    './verpost.component.css'
  ]
})
export class VerpostComponent implements OnInit {

  public contPost: any = {};

  public id: string;

  constructor( private postService: PostService,
               private router: Router,
               private activatedRoute: ActivatedRoute) {
                this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
                }

  ngOnInit(): void {

    this.verContenidoPost();

  }

  verContenidoPost() {
    //console.log('ID POST ' + this.id);
    this.postService.getPublicoContenidoPost( this.id )
                            .subscribe ( data => {
                                //console.log(data);
                                this.contPost = data;
                                //console.log(Object.values(data));
                                //this.cuestionario = Object.values(data);
                              }, error => {
                                console.log(error);
                              }
                            )

  }
}
