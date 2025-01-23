import { FormGroup, FormControl } from '@angular/forms';

export class UserCreateForm extends FormGroup {
  imageFile: File;

  constructor() {
    super({
      Name: new FormControl(''), 
      MobileNumber: new FormControl(''), 
      EmailAddress: new FormControl(''), 
      MFAStatusId: new FormControl(5), 
      LanguageId: new FormControl(1), 
      GenderId: new FormControl(1),
      ImageFile: new FormControl(null),
    });
  }

  getFormData(): FormData {
    debugger
    let formData = new FormData();

    // Add form controls to FormData
    formData.append('Name', this.get('Name').value);
    formData.append('MobileNumber', this.get('MobileNumber').value);
    formData.append('EmailAddress', this.get('EmailAddress').value);
    formData.append('MFAStatusId', this.get('MFAStatusId').value);
    formData.append('LanguageId', this.get('LanguageId').value);
    formData.append('GenderId', this.get('GenderId').value);

    // If the image file is present, add it to the FormData
    if (this.imageFile) {
      formData.append('ImageFile', this.imageFile, this.imageFile.name);
    }

    return formData;
  }
}
