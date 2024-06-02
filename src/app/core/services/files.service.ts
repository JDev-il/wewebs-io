import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class FilesService {

  private anchor!: HTMLAnchorElement;

  constructor(@Inject(DOCUMENT) public document: Document) {
    const link: HTMLAnchorElement = this.document.createElement('a');
    link.href = 'https://firebasestorage.googleapis.com/v0/b/jdev-il.appspot.com/o/files%2FResume%202024-Jonathan%20Daniel.pdf?alt=media&token=50d75842-a5de-41dd-8baa-918d584d2d5b';
    this.anchor = link;
  }

  public downloadFile() {
    this.anchor.click();
    this.anchor.remove()
  }

}
