import { Injectable } from '@angular/core';
import { ImageProperties } from './app.interface';
import { MatSnackBar } from '@angular/material';
import { BusinessLogicService } from './business-logic.service';
@Injectable()
export class ImageUploadService {
  file: any;
  imageObjectInService: ImageProperties[] = [];
  count = 0;
  constructor(public snackBar: MatSnackBar, public businesslogic: BusinessLogicService) { }

  imageupload(evt, existingImageData) {
    const promise = new Promise((resolve, reject) => {
      this.count = 0;
      this.imageObjectInService = [];
      const files = evt.target.files;
      if (files.length + existingImageData.length > 5) {
        this.snackBar.open('Files Selection Limit Exceeds', '', { duration: 3000, panelClass: ['warningMessage'] });
        reject('error');
      } else {
        for (let i = 0; i < files.length; i++) {
          if (files[i].type.indexOf('image') === -1) {
            this.snackBar.open('Accepts Only images', '', { duration: 3000, panelClass: ['warningMessage'] });
            this.count = 1;
            reject('error');
            break;
          } else if (files[i].size > 2000000) {
            this.count = 1;
            this.snackBar.open(files[i].name + ' ' + 'exceeds size limit', '', { duration: 3000, panelClass: ['warningMessage'] });
            reject('error');
            break;
          }
        }
        if (this.count === 0) {
          if (files) {
            for (let i = 0; i < files.length; i++) {
              this.file = files[i];
              const reader = new FileReader();
              console.log(reader.result);
              reader.onload = e => {
                const binaryString = e.target.result;
                this.imageObjectInService.push({
                  'imageName': files[i].name, 'imageType': files[i].type, 'Image': 'data:image/png;base64,' + btoa(binaryString),
                  'updatedBy': this.businesslogic.employeeId, 'createdBy': this.businesslogic.employeeId
                });
                if (i + 1 === files.length) {
                  resolve(this.imageObjectInService);
                }
              };
              // reader.onload = this._handleReaderLoaded.bind(this, files.length, i, files[i]);
              reader.readAsBinaryString(this.file);
            }

          }
        }
      }
    });
    return promise;
  }

  removeimage(imagedata, allImageArray): ImageProperties[] {
    const index = allImageArray.indexOf(imagedata);
    if (index >= 0) {
      allImageArray.splice(index, 1);
      return allImageArray;
    }
  }
}

