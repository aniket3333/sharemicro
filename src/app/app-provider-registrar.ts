import { ISharePointService, SHARE_POINTS_SERVICE } from './Ishare-point.service';
import { Provider } from "@angular/core";
import { SharePointService } from './share-point.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';



export const ProviderList: Provider[] = [

  {
    provide: SHARE_POINTS_SERVICE,
    useClass: SharePointService,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,  // Register the AuthInterceptor
    multi: true  // Allow multiple interceptors
  }
  
];
