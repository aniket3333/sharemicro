import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderList } from 'src/app/app-provider-registrar';
import { ISharePointService, SHARE_POINTS_SERVICE } from 'src/app/Ishare-point.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
  imports: [HttpClientModule],
  encapsulation: ViewEncapsulation.None,
  providers: [ProviderList]
})
export class UserListComponent implements OnInit {
constructor(private http: HttpClient,private _formBuilder: UntypedFormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,private route: ActivatedRoute,@Inject(SHARE_POINTS_SERVICE) private sharePointService: ISharePointService
) { }

ngOnInit(){
this.getUserList();
}

getUserList() {
  debugger
  this.sharePointService.getUserList().subscribe((res) => {
      debugger
console.log(res);

  
  });
}
}
