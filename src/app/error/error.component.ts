import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl:"./error.component.html"
})
export class ErrorComponent{
  constructor(@Inject(MAT_DIALOG_DATA) public receivedData: {message: string},
  public dialogRef: MatDialogRef<ErrorComponent>,){}

  onNoClick(){
    this.dialogRef.close();
  }
}
