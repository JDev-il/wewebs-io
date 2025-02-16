import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class FilesService {

  private anchor!: HTMLAnchorElement;

  constructor(@Inject(DOCUMENT) public document: Document) {
    const link: HTMLAnchorElement = this.document.createElement('a');
    link.href = 'https://firebasestorage.googleapis.com/v0/b/jdev-il.appspot.com/o/files%2FJonathan-Daniel-CV.pdf?alt=media&token=109aec05-8f56-444a-ae6c-b5ff77739fb5';
    this.anchor = link;
  }

  public downloadFile() {
    this.anchor.click();
    this.anchor.remove()
  }

}
