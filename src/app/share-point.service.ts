import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseModel } from './common/base-response.model';
import { DataTableModel } from './common/datatable.model';
import { SitesModal } from './common/siteModal';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ISharePointService } from './Ishare-point.service';
import { UserModel } from './model/user.model';
import { UserSearch } from './model/user.search.model';
import { HttpHeaders } from '@angular/common/http';
import { UploadFile } from './model/upload-file.model';



@Injectable({
  providedIn: 'root'
})
export class SharePointService  implements ISharePointService{
 
  constructor(private http:HttpClient) { }

  private getAuthToken(): string | null {
    return localStorage.getItem('accesstoken');  // Get the token from localStorage (or sessionStorage)
  }
  private createHttpOptions(): { headers: HttpHeaders } {
    debugger
    const token = this.getAuthToken();  // Retrieve the token dynamically
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'AccessToken': token ? `${token}` : '' // Only add Authorization if token exists
    });
    return { headers };
  }
  private createHttpOption(): { headers: HttpHeaders } {
    const token = this.getAuthToken();  // Retrieve the token dynamically
    
    // Only add Authorization header if the token exists
    const headers = new HttpHeaders({
      'AccessToken': token ? `${token}` : ''  // Include AccessToken header with token
    });
    
    return { headers };
  }

  
 
  getAllSites():Observable<BaseResponseModel<DataTableModel<SitesModal>>>{

    // return this.http.get("https://rnapi.sdaemon.com/Api/api/v1/SharePoint/GetSites")
    const url = 'https://rnapi.sdaemon.com/Api/api/v1/SharePoint/GetSites';

    const options = this.createHttpOptions(); 
    return this.http.get<BaseResponseModel<DataTableModel<SitesModal>>>(
    url,options

    );
  }
  getDrivesBySiteId(SiteId:string):Observable<BaseResponseModel<DataTableModel<SitesModal>>>{
    // return this.http.get("https://rnapi.sdaemon.com/Api/api/v1/SharePoint/GetSites")
    let params = new HttpParams().set("SiteId", SiteId)
    const url = "https://rnapi.sdaemon.com/Api/api/v1/SharePoint/GetDrivesBySiteId";
    const options = this.createHttpOptions(); 
    return this.http.get<BaseResponseModel<DataTableModel<SitesModal>>>(url, { 
      params,      // Attach query parameters
      ...options   // Spread the options (headers, etc.)
    }

    );
  }
  getDrivesItemByDriveId(DriveId:string):Observable<BaseResponseModel<DataTableModel<SitesModal>>>{
    // return this.http.get("https://rnapi.sdaemon.com/Api/api/v1/SharePoint/GetSites")
    let params = new HttpParams().set("DriveId", DriveId)
    const url  = "https://rnapi.sdaemon.com/Api/api/v1/SharePoint/GetDrivesItemByDriveId";
    const options = this.createHttpOptions(); 
    return this.http.get<BaseResponseModel<DataTableModel<SitesModal>>>(url,{params,...options}

    );
  }
  viewDrivesfile(fileUrl:string):Observable<BaseResponseModel<DataTableModel<SitesModal>>>{
    // return this.http.get("https://rnapi.sdaemon.com/Api/api/v1/SharePoint/GetSites")
    let params = new HttpParams().set("fileUrl", fileUrl)
    const url = "https://rnapi.sdaemon.com/Api/api/v1/SharePoint/NewReadExcelFile";
    const options = this.createHttpOptions(); 
    return this.http.get<BaseResponseModel<DataTableModel<SitesModal>>>(url,{params,...options}
    );
  }
  getAccessToken(AuthorizationCode:any):Observable<BaseResponseModel<DataTableModel<any>>>{
    return this.http.post<BaseResponseModel<DataTableModel<any>>>("https://rnapi.sdaemon.com/Api/api/v1/Microsoft365User/GetAccessToken",{AuthorizationCode}
    );
  }
  getUserList(model:UserSearch):Observable<BaseResponseModel<DataTableModel<UserModel>>>{
    
    let params = new HttpParams().set("SearchText", model.searchText)
    .set("Page", model.page).set("PageSize", model.pageSize)
    return this.http.get<BaseResponseModel<DataTableModel<UserModel>>>("https://rnapi.sdaemon.com/Api/api/v1/User/GetUserList",{params}
    );
  }

 
  deleteByIdUser(id:number):Observable<BaseResponseModel<DataTableModel<any>>>{
    
    let params = new HttpParams().set("Id", id)
   
    return this.http.delete<BaseResponseModel<DataTableModel<UserModel>>>("https://rnapi.sdaemon.com/Api/api/v1/User/DeleteUser",{params}
    );
  }
  // addUser(model:UserModel):Observable<BaseResponseModel<DataTableModel<UserModel>>>{
    
  
  //   return this.http.post<BaseResponseModel<DataTableModel<UserModel>>>("https://rnapi.sdaemon.com/Api/api/v1/Microsoft365User/CreateUser",{model}
  //   );
  // }

//   addUser(model: FormData): Observable<BaseResponseModel<string>> {
//     const url = 'https://rnapi.sdaemon.com/Api/api/v1/Microsoft365User/CreateUser';
// debugger
//     const options = this.createHttpOptions();  // Get the HTTP options with Authorization header
    
//     return this.http.post<BaseResponseModel<string>>(url, model , options);
//   }

  addUser(model: FormData): Observable<BaseResponseModel<string>> {
    const url = 'https://rnapi.sdaemon.com/Api/api/v1/Microsoft365User/CreateUser';
  
    // Prepare HTTP options if you need additional headers
    const options = this.createHttpOption();
  
    // Send the FormData directly as the body of the POST request
    return this.http.post<BaseResponseModel<string>>(url, model, options);
  }
  uploadFile(model: UploadFile): Observable<BaseResponseModel<DataTableModel<any>>> {
    const url = 'https://localhost:44339/Api/api/v1/MicrosoftSharePoint/UploadFile';

    const options = this.createHttpOptions();  // Get the HTTP options with Authorization header
    
    return this.http.post<BaseResponseModel<DataTableModel<UserModel>>>(url, { model }, options);
  }

}
