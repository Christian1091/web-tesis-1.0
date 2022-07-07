import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Noticia } from '../../models/noticia.model';

@Component({
  selector: 'app-ver-noticia',
  templateUrl: './ver-noticia.component.html',
  styleUrls: ['./ver-noticia.component.css']
})
export class VerNoticiaComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Noticia) { }

  ngOnInit(): void {
    console.log(this.data);
    
  }

}
