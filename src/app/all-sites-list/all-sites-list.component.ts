import { Component, Inject, OnInit } from '@angular/core';
import { SharePointService } from '../share-point.service';
import { ISharePointService, SHARE_POINTS_SERVICE } from '../Ishare-point.service';
import { HttpStatus } from '../common/http-status';
import { SitesModal } from '../common/siteModal';
import { ProviderList } from '../app-provider-registrar';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-sites-list',
  standalone: true, // This indicates that the component is standalone
  imports: [HttpClientModule, CommonModule, RouterModule], // List of imported modules
  templateUrl: './all-sites-list.component.html', // Path to the HTML template
  styleUrls: ['./all-sites-list.component.css'], // Use styleUrls (plural)
  providers: [ProviderList] // List of providers (services)
})
export class AllSitesListComponent implements OnInit {
  sitesModel: SitesModal = new SitesModal();
  sitesData:any;
   responseData = {
    createdDateTime: "2020-07-03T09:35:09Z",
    description: null,
    displayName: "User Management",
    id: "111",
    lastModifiedDateTime: "2020-06-27T19:31:33Z",
    name: "sdaemoninfo.sharepoint.com",
    root: {},
    siteCollection: { hostname: 'sdaemoninfo.sharepoint.com' },
    webUrl: "https://sdaemoninfo.sharepoint.com"
  };
  constructor(
    @Inject(SHARE_POINTS_SERVICE) private sharePointService: ISharePointService, private router :Router
  ) {

  }

navigate(siteId:string){
  debugger
  if(siteId=='111')
  {
    this.router.navigate(["/drive-list", siteId])
  }
  else{
    this.router.navigate(["/drive-list", siteId])
  }

}
  ngOnInit(): void {
    this.getAllSites();
  }
  getAllSites() {
    this.sharePointService.getAllSites().subscribe((res) => {
      if (res.Status == HttpStatus.Success) {
        debugger
        this.sitesModel = res.Data.value;
        this.sitesData= res.Data.value;
        this.sitesData.push({
          displayName: this.responseData.displayName,
          id: this.responseData.id
        });
        console.log(this.sitesData);
      }
    });
  }

  // You can add logic for assigning file types here if needed


}

