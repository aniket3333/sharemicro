import { HttpStatus } from "./http-status";
export class BaseResponseModel<T> {
  Data?: T | any;
  Status: HttpStatus = HttpStatus.Failed;
  Message!: string;
  access_token!:'';
}
