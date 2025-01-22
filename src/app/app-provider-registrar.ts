import { ISharePointService, SHARE_POINTS_SERVICE } from './Ishare-point.service';
import { Provider } from "@angular/core";
import { SharePointService } from './share-point.service';



export const ProviderList: Provider[] = [

  {
    provide: SHARE_POINTS_SERVICE
    ,
    useClass: SharePointService,
  }
];
