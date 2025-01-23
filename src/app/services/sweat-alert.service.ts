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
            title: title ?? "ALERT.SWAL.DELETE.TITLE",
            text: text ?? "ALERT.SWAL.DELETE.MESSAGE",
            icon: "warning",
            confirmButtonText:
                "ALERT.SWAL.DELETE.CONFIRM_BUTTON_TEXT"
            ,
            cancelButtonText:
                "ALERT.SWAL.DELETE.CANCEL_BUTTON_TEXT"
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
                title ?? "ALERT.SWAL.ERROR.CANCELLED"
            ,
            text:
                text ?? "ALERT.SWAL.ERROR.ERROR_WHILE_DELETING_DATA"
            ,
            icon: "error",
        });
    }

    deleteConfirmationSuccessAlert(
        title?: string,
        text?: string
    ): Promise<SweetAlertResult<Awaited<any>>> {
        return this.swalWithBootstrapButtons.fire({
            title: title ?? "ALERT.SWAL.ERROR.DELETED",
            text:
                text ?? "ALERT.SWAL.ERROR.YOUR_DATA_HAS_BEEN_DELETED"
            ,
            icon: "success",
        });
    }




    //#endregion
}
