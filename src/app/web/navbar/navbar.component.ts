import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [
    './navbar.component.css'
  ]
})
export class NavbarComponent implements OnInit {

  public isLoggedIn: boolean = false;

  public listPost: Post[] = [];
  public size: number = 0;

  constructor(private usuarioService: UsuarioService, private postService: PostService, private router: Router) {
    this.isLoggedIn = usuarioService.existeToken();
    
   }

   getListPost() {
    this.postService.getListPost()
                    .subscribe(({ post }) => {
                              //console.log(posts);
                              this.listPost = post;
                              
                            });
  }

  ir(item: Post) {
    window.location.href = `/post/publico/${item._id}`;
  }

  ngOnInit(): void {
    this.getListPost();
  }
  regresar() {
    window.location.href = "/web#team";
    
  }

}
