
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import {  throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { ErrorComponent } from './error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

  constructor(private dialog : MatDialog ){}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((response : HttpErrorResponse) =>{
        let errorMessage = "an unknown error occured";
        console.log(response);
        if(response.error.message){
          errorMessage=response.error.message;
        }
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {message : errorMessage};
        // dialogConfig.disableClose = true;
        // dialogConfig.autoFocus = true;
        this.dialog.open(ErrorComponent, dialogConfig);
        return throwError(response);
      })
    );
  }

}
