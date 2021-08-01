import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-role-cards',
  templateUrl: './role-cards.component.html',
  styleUrls: ['./role-cards.component.css']
})

export class RoleCardsComponent implements OnInit {
myData = [
  {text: 'Office of principal', src: '../../../assets/Saly-19.png'},
  {text: 'Department', src: '../../../assets/Saly-13.png'},
  {text: 'MIS', src: '../../../assets/Saly-42.png'}
];
  constructor() { }

  ngOnInit(): void {

  }

}
