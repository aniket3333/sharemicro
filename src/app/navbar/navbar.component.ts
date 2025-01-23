import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
   standalone: true,
    imports: [],
    encapsulation: ViewEncapsulation.None,
    providers: []
})
export class NavbarComponent {
  userName: string = 'John Doe';
  userTitle: string = 'Software Engineer';
}
