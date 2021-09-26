import { AbstractControl } from "@angular/forms";
import { Observable, Observer, of } from 'rxjs';

// Promise尖括号里的对象表示：只要有一个string类型的属性就可以
export const mimeType = (control : AbstractControl): Promise<{[key : string]: any}> | Observable<{[key:string]:any}> =>{
  if(typeof(control.value)=== 'string'){
    return of(null);
  }
  const file = control.value as File;
  const fileReader = new FileReader();
  fileReader.onload = ()=>{}
  //因为要返回的是一个Observable对象↓, 参数里的observer是用来观察emit的情况的
  const filereaderObs = new Observable((observer: Observer<{[key : string]: any}>) => {
    fileReader.addEventListener("loadend", ()=>{
      const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0,4);
      let header = "";
      for (let i = 0; i < arr.length; i ++){
        header += arr[i].toString(16);
      }
      let isValid = false;
      switch(header){
        case "89504e47":
          isValid = true;
          break;
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
          isValid = true;
          break;
        default:
          isValid = false; // Or you can use the blob.type as fallback
          break;
      }
      if(isValid){
        observer.next(null);
      }else{
        observer.next({invalidMimeType: true})
      }
      observer.complete();
    })
    fileReader.readAsArrayBuffer(file)
  })
  return filereaderObs;
};
