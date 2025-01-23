import { Component, Inject } from '@angular/core';
import { HttpStatus } from '../common/http-status';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SitesModal } from '../common/siteModal';
import { SHARE_POINTS_SERVICE, ISharePointService } from '../Ishare-point.service';
import { ProviderList } from '../app-provider-registrar';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drive-item-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule,RouterModule],
  templateUrl: './drive-item-list.component.html',
  styleUrls: ['./drive-item-list.component.css'],
  providers:[ProviderList]
})
export class DriveItemListComponent {
  sitesModel: SitesModal = new SitesModal();
  sitesData:any
  DriveId: string='';
  uploafFileFlag: boolean;
  constructor(
    @Inject(SHARE_POINTS_SERVICE) private sharePointService: ISharePointService, private router :Router,private activateRoute:ActivatedRoute
  ) {
    this.activateRoute.paramMap.subscribe(res=>{
     this.DriveId = res.get("DriveId")?.toString() ?? ''
    })
  }

navigate(site:any){
  debugger
 let fileUrl= this.getDownloadUrl(site);
 debugger
  this.router.navigate(["/drive-view-file",fileUrl])
}
  ngOnInit(): void {
    this.getAllSites();
  }
  getAllSites() {
    this.sharePointService.getDrivesItemByDriveId(this.DriveId).subscribe((res) => {
      if (res.Status == HttpStatus.Success) {
        debugger
        this.sitesModel = res.Data.Value;
        this.sitesData= res.Data.Value;
      }
    });
  }
  getDownloadUrl(site: any): string {
    debugger
    return site['@microsoft.graph.downloadUrl'];
  }
  uploadFile()
  {
   this.uploafFileFlag = true; 
  }
}
