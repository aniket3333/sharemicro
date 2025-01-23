import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserModel } from "./user.model"; // Assuming the UserModel is in a file user.model.ts

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
      ImageFile: new FormControl(null)
     

      
    });
  }


  getFormData(): UserModel {
    let model = new UserModel();
 
    model.Name = this.get("Name").value;
    model.MobileNumber = this.get("MobileNumber").value;
    model.EmailAddress = this.get("EmailAddress").value;
    model.MFAStatusId = this.get("MFAStatusId").value;
    model.LanguageId = this.get("LanguageId").value;
    model.GenderId = this.get("GenderId").value;
    model.ImageFile = this.get("ImageFile").value;

    return model;
  };

  
  setControlValues(model: UserModel) {
    if (!model) {
      return;
    }
    this.get("Id").setValue(model.Id);
    this.get("Name").setValue(model.Name);
    this.get("MobileNumber").setValue(model.MobileNumber);
    this.get("EmailAddress").setValue(model.EmailAddress);
    this.get("MFAStatusId").setValue(model.MFAStatusId);
    this.get("LanguageId").setValue(model.LanguageId);
    this.get("GenderId").setValue(model.GenderId);
    this.get("ImageFile").setValue(model.ImageFile);
   
}
}
