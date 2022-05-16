import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import { Noticia } from '../../models/noticia.model';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: [
    './sections.component.css'
  ]
})
export class SectionsComponent implements OnInit {

  public listPost: Post[] = [];
  public noticias: Noticia[] = [];

  public contPost: any = {};

  public id: string;

  constructor( private postService: PostService,
               private activatedRoute: ActivatedRoute) {
                this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
                }

  ngOnInit(): void {
    this.getListPost();
    this.cargarNoticia();
  }

  getListPost() {
    this.postService.getListPost()
                    .subscribe(({ post }) => {
                              this.listPost = post;
                            });
  }

  cargarNoticia(){
    this.postService.getListNoticias().subscribe(response => {
      this.noticias = response['noticias'];
      //this.noticias = this.noticias.slice(0, 3);
      this.noticias  = this.noticias.slice(this.noticias.length -4, this.noticias.length);
      console.log(this.noticias);
    });
  }


}
