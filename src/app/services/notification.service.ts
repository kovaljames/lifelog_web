import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(success: boolean, message: string, action: string = "OK") {
    this._snackBar.open(message, action, {
      duration: 5000,
      panelClass: success ? ['mat-toolbar'] : ['mat-warn']
    });
  }

  openSnackBarThenReturnRef(success: boolean, message: string, action: string = "OK") {
    const snackBarRef: MatSnackBarRef<TextOnlySnackBar> = this._snackBar.open(message, action, {
      duration: 500000,
      panelClass: success ? ['mat-toolbar'] : ['mat-warn']
    });
    return snackBarRef
  }
}
