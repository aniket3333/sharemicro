import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseModel } from './common/base-response.model';
import { DataTableModel } from './common/datatable.model';
import { SitesModal } from './common/siteModal';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ISharePointService } from './Ishare-point.service';
import { UserModel } from './model/user.model';
import { UserSearch } from './model/user.search.model';

@Injectable({
  providedIn: 'root'
})
export class SharePointService  implements ISharePointService{

  constructor(private http:HttpClient) { }

  getAllSites():Observable<BaseResponseModel<DataTableModel<SitesModal>>>{

    // return this.http.get("https://rnapi.sdaemon.com/Api/api/v1/SharePoint/GetSites")

    return this.http.get<BaseResponseModel<DataTableModel<SitesModal>>>(
     "https://rnapi.sdaemon.com/Api/api/v1/SharePoint/GetSites",

    );
  }
  getDrivesBySiteId(SiteId:string):Observable<BaseResponseModel<DataTableModel<SitesModal>>>{
    // return this.http.get("https://rnapi.sdaemon.com/Api/api/v1/SharePoint/GetSites")
    let params = new HttpParams().set("SiteId", SiteId)

    return this.http.get<BaseResponseModel<DataTableModel<SitesModal>>>("https://rnapi.sdaemon.com/Api/api/v1/SharePoint/GetDrivesBySiteId",{params}

    );
  }
  getDrivesItemByDriveId(DriveId:string):Observable<BaseResponseModel<DataTableModel<SitesModal>>>{
    // return this.http.get("https://rnapi.sdaemon.com/Api/api/v1/SharePoint/GetSites")
    let params = new HttpParams().set("DriveId", DriveId)

    return this.http.get<BaseResponseModel<DataTableModel<SitesModal>>>("https://rnapi.sdaemon.com/Api/api/v1/SharePoint/GetDrivesItemByDriveId",{params}

    );
  }
  viewDrivesfile(fileUrl:string):Observable<BaseResponseModel<DataTableModel<SitesModal>>>{
    // return this.http.get("https://rnapi.sdaemon.com/Api/api/v1/SharePoint/GetSites")
    let params = new HttpParams().set("fileUrl", fileUrl)
    return this.http.get<BaseResponseModel<DataTableModel<SitesModal>>>("https://rnapi.sdaemon.com/Api/api/v1/SharePoint/NewReadExcelFile",{params}
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
  addUser(model:UserModel):Observable<BaseResponseModel<DataTableModel<UserModel>>>{
    
  
    return this.http.post<BaseResponseModel<DataTableModel<UserModel>>>("https://rnapi.sdaemon.com/Api/api/v1/Microsoft365User/CreateUser",{model}
    );
  }

}
