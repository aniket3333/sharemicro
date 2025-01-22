import { TestBed } from '@angular/core/testing';

import { SharePointService } from './share-point.service';
import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseModel } from './common/base-response.model';
import { DataTableModel } from './common/datatable.model';
import { SitesModal } from './common/siteModal';

export const SHARE_POINTS_SERVICE = new InjectionToken("share points service");

export interface ISharePointService{

  getAllSites():Observable<BaseResponseModel<DataTableModel<SitesModal>>>;
  getDrivesBySiteId(SiteId:string):Observable<BaseResponseModel<DataTableModel<SitesModal>>>;
  getDrivesItemByDriveId(DriveId:string):Observable<BaseResponseModel<DataTableModel<SitesModal>>>;
  viewDrivesfile(fileUrl:string):Observable<BaseResponseModel<DataTableModel<SitesModal>>>;


}
