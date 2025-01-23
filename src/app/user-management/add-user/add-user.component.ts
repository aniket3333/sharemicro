import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderList } from 'src/app/app-provider-registrar';
import { HttpStatus } from 'src/app/common/http-status';
import { ISharePointService, SHARE_POINTS_SERVICE } from 'src/app/Ishare-point.service';
import { UserCreateForm } from 'src/app/model/user-create-form.model';
import { NavbarComponent } from 'src/app/navbar/navbar.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
    standalone: true,
    imports: [HttpClientModule,NavbarComponent,CommonModule,ReactiveFormsModule],
    encapsulation: ViewEncapsulation.None,
    providers: [ProviderList]
})
export class AddUserComponent implements OnInit{
  addUserForm:FormGroup;
  selectedFile: File | null = null; // Stores the selected file
  showError: string;
  showSuccess: string;

 get f(){
 return this.addUserForm.controls;
 }
constructor(private fb:FormBuilder,private http: HttpClient,private _formBuilder: UntypedFormBuilder,
    private _router: Router,private _route: ActivatedRoute,private route: ActivatedRoute,@Inject(SHARE_POINTS_SERVICE) private sharePointService: ISharePointService
) { }
ngOnInit(): void {
  this.addUserForm = this.fb.group({
    Name: [''],
    MobileNumber: [''],
    EmailAddress: [''],
    MFAStatusId: [5],
    LanguageId: [1],
    GenderId: [1],
    ImageFile: [null]
  })
}


createFormData(formValue: any): FormData {
  const formData = new FormData();
console.log(formValue);
  formData.append('Name', formValue.Name);
  formData.append('MobileNumber', formValue.MobileNumber);
  formData.append('EmailAddress', formValue.EmailAddress);
  formData.append('MFAStatusId', formValue.MFAStatusId);
  formData.append('LanguageId', formValue.LanguageId);
  formData.append('GenderId', formValue.GenderId);
  if (formValue.ImageFile) {
    formData.append('ImageFile', this.selectedFile);
  }

  

  return formData;
}


cancelAddUpdateModel()
{
  this._router.navigate(['/user-management/user-list']);
}

onSubmit() {
  debugger
  const formData = this.createFormData(this.addUserForm.value);
  console.log(formData);
  debugger
  this.sharePointService.addUser(formData)
    .subscribe((response) => {
      if(response.Status == HttpStatus.Failed){
        this.showError = response.Message.trim();
      }
      if (response.Status == HttpStatus.Success) {
        this.showSuccess = response.Message.trim();
        setTimeout(()=>{
          this.cancelAddUpdateModel();
        },1500)
      } else {
        this.showError =response.Message.trim();
        // this.cancelAddUpdateModel();
      }
   
    },
  (error)=>{
    this.showError ='';
    // this.cancelAddUpdateModel();
  });
}
onFileSelected(event: Event): void {
  const file = (event.target as HTMLInputElement)?.files?.[0];

  if (file) {
    this.selectedFile = file;
    this.addUserForm.patchValue({ ImageFile: file });
    this.addUserForm.get('ImageFile')?.updateValueAndValidity();
  } else {
    this.addUserForm.patchValue({ ImageFile: null });
    this.addUserForm.get('ImageFile')?.updateValueAndValidity();
  }
}

}
