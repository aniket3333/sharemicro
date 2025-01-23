import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
   standalone: true,
    imports: [],
    encapsulation: ViewEncapsulation.None,
    providers: []
})
export class NavbarComponent implements OnInit {
  userName: string = 'John Doe';
  constructor(){}

  ngOnInit(): void {
    let userName = localStorage.getItem('name');
    this.userName = userName ? userName.trim() : '';
    alert(this.userName);
  }
}
