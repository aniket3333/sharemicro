import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {   HttpClientModule } from '@angular/common/http';
import { ProviderList } from './app-provider-registrar';
import { AgGridModule } from '@ag-grid-community/angular/lib/ag-grid-angular.module';

@NgModule({
  declarations: [
    AppComponent  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
   ProviderList,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
