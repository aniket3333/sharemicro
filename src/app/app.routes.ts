import { Routes } from '@angular/router';
import { DriveItemListComponent } from './drive-item-list/drive-item-list.component';
import { AllSitesListComponent } from './all-sites-list/all-sites-list.component';
import { DrivesSitesListComponent } from './drives-sites-list/drives-sites-list.component';
import { FinanceExample } from './finance-example/finance-example.component';
import { LoginComponent } from './login/login/login.component';
import { UserListComponent } from './user-management/user-list/user-list.component';
import { AddUserComponent } from './user-management/add-user/add-user.component';

export const routes: Routes = [
  {path:"" , redirectTo:"Test/Callback",pathMatch:"full"},
  {path:"Test/Callback" , component :LoginComponent},
  {path:"all-sites" , component :AllSitesListComponent},
  {path:"drive-list/:siteId" , component :DrivesSitesListComponent},
  {path:"drive-item/:DriveId" , component :DriveItemListComponent},
  {path:"drive-view-file/:fileUrl" , component :FinanceExample},
  {path:"user-management/user-list" , component :UserListComponent},
  {path:"user-management/add-user" , component :AddUserComponent}
];
