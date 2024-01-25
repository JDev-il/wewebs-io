import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class FilesService {

  private anchor!: HTMLAnchorElement;

  constructor(@Inject(DOCUMENT) public document: Document) {
    const link: HTMLAnchorElement = this.document.createElement('a');
    link.href = 'https://firebasestorage.googleapis.com/v0/b/jdev-il.appspot.com/o/files%2Fjonathan-daniel-cv.docx?alt=media&token=ac4316f1-4f37-47fa-9ea8-9e31089f7281';
    this.anchor = link;
  }

  public downloadFile() {
    this.anchor.click();
    this.anchor.remove()
  }

}
