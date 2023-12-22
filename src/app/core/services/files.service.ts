import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class FilesService {

  constructor(private http: HttpClient) { }

  downloadFile() {
    let link: HTMLAnchorElement = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.href = 'https://firebasestorage.googleapis.com/v0/b/jdev-il.appspot.com/o/files%2Fjonathan-daniel-cv.docx?alt=media&token=80a95472-58d9-4630-a790-162792fbca44';
    link.click();
    link.remove();
  }

}
