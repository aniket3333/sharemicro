import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FinanceExample } from './finance-example/finance-example.component';
import { AllSitesListComponent } from './all-sites-list/all-sites-list.component';
import { CommonModule } from '@angular/common';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FinanceExample,AllSitesListComponent,CommonModule,NgxUiLoaderModule,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ag-grid-finance-example-angular';
}
