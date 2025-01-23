import Swal, { SweetAlertResult } from 'sweetalert2';
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class SweetAlertService {
    //#region Fields

    private swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger ms-2",
        },
        buttonsStyling: false,
    });

    //#endregion

    //#region Constructor

    constructor() { }

    //#endregion

    //#region Methods



    deleteConfirmationAlert(
        title?: string,
        text?: string
    ): Promise<SweetAlertResult<Awaited<any>>> {
        return this.swalWithBootstrapButtons.fire({
            title: title ?? "Are you sure",
            text: text ?? "Cannot revert after delete",
            icon: "warning",
            confirmButtonText:
                "Yes"
            ,
            cancelButtonText:
                "No"
            ,
            showCancelButton: true,
        });
    }

    deleteConfirmationFailedAlert(
        title?: string,
        text?: string
    ): Promise<SweetAlertResult<Awaited<any>>> {
        return this.swalWithBootstrapButtons.fire({
            title: 
                title ?? "Cancelled"
            ,
            text:
                text ?? "Error while fetching data"
            ,
            icon: "error",
        });
    }

    deleteConfirmationSuccessAlert(
        title?: string,
        text?: string
    ): Promise<SweetAlertResult<Awaited<any>>> {
        return this.swalWithBootstrapButtons.fire({
            title: title ?? "Deleted",
            text:
                text ?? "Your data is deleted successfully"
            ,
            icon: "success",
        });
    }




    //#endregion
}
