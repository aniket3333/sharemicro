import { BaseModel } from './base.model';

export class SitesModal extends BaseModel {
  createdDateTime!: string;
  name!: string;
  displayName!: string;
  description!: string | null;
  webUrl!: string;
  root!: object;
  siteCollection!: { hostname: string };
}
