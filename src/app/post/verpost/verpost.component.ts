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

  regresar() {
    window.location.href = "/web#team";
    
  }

  verContenidoPost() {
    this.postService.getPublicoContenidoPost( this.id )
                            .subscribe ( data => {
                                this.contPost = data;
                                //this.cuestionario = Object.values(data);
                              }, error => {
                                console.log(error);
                              }
                            )

  }
}
