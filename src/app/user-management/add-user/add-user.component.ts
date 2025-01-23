import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
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
 addUserForm: UserCreateForm;

 get f(){
 return this.addUserForm.controls;
 }
constructor(private http: HttpClient,private _formBuilder: UntypedFormBuilder,
    private _router: Router,private _route: ActivatedRoute,private route: ActivatedRoute,@Inject(SHARE_POINTS_SERVICE) private sharePointService: ISharePointService
) { }
ngOnInit(): void {
  this.addUserForm =  new UserCreateForm();
}
cancelAddUpdateModel()
{
  this._router.navigate(['/user-management/user-list']);
}

onSubmit() {
  debugger
 let model =  this.addUserForm.getFormData();
 console.log(model);
  this.sharePointService.addUser(model)
    .subscribe((response) => {
      if (response.Status == HttpStatus.Success) {
        
      } else {
      }
    });
}
onFileSelected(event: any): void {
  const file = event.target.files[0];
  if (file) {
    this.convertFileToBase64(file).then((base64: string) => {
      this.addUserForm.get("ImageFile").setValue(base64); // Save the base64 string in the form control
    });
  }
}
convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // This will convert the file to base64
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => reject(error);
  });
}
}
