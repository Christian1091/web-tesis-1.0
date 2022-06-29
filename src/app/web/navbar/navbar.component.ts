import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MatMenuModule } from '@angular/material/menu';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [
    './navbar.component.css'
  ]
})
export class NavbarComponent implements OnInit {

  public isLoggedIn: boolean = false;
  public items: MenuItem[];
  public listPost: Post[] = [];
  public lastPost: Post[] = [];
  public size: number = 0;
  private menuItems = [];
   

  constructor(private usuarioService: UsuarioService, private postService: PostService, private router: Router) {
    this.isLoggedIn = usuarioService.existeToken();
    
  }

  getListPost() {
    this.postService.getListPost()
      .subscribe(({ post }) => {
        this.listPost = post;
        this.getLastPost();
      });
  }
  ir(item: Post) {
    window.location.href = `/post/publico/${item._id}`;
  }
  ngOnInit(): void {
    this.getListPost();
   
  }

  getLastPost(){
    
  let inicio = this.listPost.length < 5 ? 0: this.listPost.length -4;
  let final = this.listPost.length ; 
  
    this.lastPost = this.listPost.slice(inicio, final);
    this.lastPost.map( p => {
      const menu = {
        label: p.titulo.substring(0,45), 
        routerLink: [ '/post/publico',p._id ]
      };
      this.menuItems.push (menu);
      this.cargarMenu();
    })
  }
  regresar() {
    window.location.href = "/web#team";
  }

  public cargarMenu() {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-fw pi-file',
        routerLink: '/web',
        styleClass: 'styleItems'  
      },
      {
        label: 'Resultados',
        icon: 'pi pi-fw pi-pencil',
        routerLink: '/general',
        styleClass: 'styleItems'
      },
      {
        label: 'Artículos',
        items: this.menuItems,
        styleClass: 'styleItems'
      },
      {
        label: 'Iniciar sesión',
        icon: 'pi pi-fw pi-power-off',
        routerLink: '/login',
        styleClass: 'styleItems'
      }
    ];
    if (this.isLoggedIn) {
      this.items.splice(3, 0, {
        label: 'Tests',
        icon: 'pi pi-fw pi-calendar',
        routerLink: '/listCuestionarios',
        styleClass: 'styleItems'
      });
    }
  }
}
