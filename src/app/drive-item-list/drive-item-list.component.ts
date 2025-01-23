import { Component, Inject } from '@angular/core';
import { HttpStatus } from '../common/http-status';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SitesModal } from '../common/siteModal';
import { SHARE_POINTS_SERVICE, ISharePointService } from '../Ishare-point.service';
import { ProviderList } from '../app-provider-registrar';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UploadFile } from '../model/upload-file.model';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-drive-item-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule,RouterModule,NavbarComponent],
  templateUrl: './drive-item-list.component.html',
  styleUrls: ['./drive-item-list.component.css'],
  providers:[ProviderList]
})
export class DriveItemListComponent {
  sitesModel: SitesModal = new SitesModal();
  sitesData:any
  DriveId: string='';
  uploafFileFlag: boolean;
  selectedFile: File;
  uploadFilei:UploadFile;
  successMessage: string;
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
    this.uploadFilei =new  UploadFile();

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
  createFormData(formValue: any): FormData {
    const formData = new FormData();
  console.log(formValue);
    formData.append('file', formValue.file);
    formData.append('DriveId', formValue.DriveId);
    formData.append('SiteId', formValue.SiteId);
    return formData;
  }
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.selectedFile = file;
      this.uploadFilei.file = file;
      this.uploadFilei.DriveId = this.DriveId;
      this.uploadFilei.SiteId = '4b9eabb3-e8c0-4bfa-8568-1c7addced90f,7ac7501c-6905-4db8-b7a9-3b04184102ef';
      const formData = this.createFormData(this.uploadFilei);
      console.log(formData);
      this.sharePointService.uploadFile(formData).subscribe((res) => {
        if (res.Status == HttpStatus.Success) {
          debugger
          this.uploafFileFlag = false;
          this.successMessage = 'File uploaded successfully';
          console.log(res);
          setTimeout(()=>{
            this.successMessage='';
            this.getAllSites();
          },2000);
        
         
        }
      });
    } else {
   
    }
  }
}
