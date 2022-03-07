import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-ver-post',
  templateUrl: './ver-post.component.html',
  styleUrls: ['./ver-post.component.css']
})
export class VerPostComponent implements OnInit {

  public post:Post;


  constructor(@Inject(MAT_DIALOG_DATA) public data: Post) {
    this.post= data;
    console.log(data);
    
   }

  ngOnInit(): void {
  }

}
