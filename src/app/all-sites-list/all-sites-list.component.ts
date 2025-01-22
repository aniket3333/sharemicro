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
  standalone: true,
  imports: [HttpClientModule, CommonModule,RouterModule],
  templateUrl: './all-sites-list.component.html',
  styleUrl: './all-sites-list.component.css',
  providers:[ProviderList]
})
export class AllSitesListComponent implements OnInit {
  sitesModel: SitesModal = new SitesModal();
  sitesData:any
  constructor(
    @Inject(SHARE_POINTS_SERVICE) private sharePointService: ISharePointService, private router :Router
  ) {

  }

navigate(siteId:string){
  debugger
  this.router.navigate(["/drive-list", siteId])
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
      }
    });
  }

  // You can add logic for assigning file types here if needed


}

