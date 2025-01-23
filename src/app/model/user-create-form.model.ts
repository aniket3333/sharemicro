import { FormGroup, FormControl, Validators } from "@angular/forms";

export class UserCreateForm extends FormGroup {
    imageFile: File;
    imageFileUrl: string;
  
  constructor() {
    super({
        
      Name: new FormControl(''), // Name is required
      MobileNumber: new FormControl(''), // MobileNumber must be a 10 digit number
      EmailAddress: new FormControl(''), // Email is required and should be a valid email format
      MFAStatusId: new FormControl(5), // Default MFAStatusId value (change if needed)
      LanguageId: new FormControl(1), // Default MFAStatusId value (change if needed)
      GenderId: new FormControl(1), // Default MFAStatusId value (change if needed)
    
     

      
    });
  }

  getFormData(): FormData {
    let formData = new FormData();

    formData.set('Name', this.get('name').value);
    formData.set('MobileNumber', this.get('MobileNumber').value);
    formData.set('EmailAddress', this.get('EmailAddress').value);
    formData.set('MFAStatusId', this.get('MFAStatusId').value);
    formData.set('LanguageId', this.get('LanguageId').value);
    formData.set('GenderId', this.get('GenderId').value);

    if (this.imageFile) {
      formData.set('ImageFile', this.imageFile, this.imageFile.name);
    }
    return formData;
  }

  
 
}
