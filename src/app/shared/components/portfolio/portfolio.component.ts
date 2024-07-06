import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UnSubscriber } from 'src/app/core/abstracts/UnSubscriber';
import { PageName } from 'src/app/core/enums/pages.enum';
import { ProjectDetails, ProjectModel } from 'src/app/core/interfaces/Project.interface';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';

@Component({
  selector: 'Portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: [
    '../../styles/component.core.scss',
    './portfolio.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PortfolioComponent extends UnSubscriber {

  @Input() projects!: ProjectModel[];

  @ViewChild('scrollElement') scrollElement!: ElementRef;

  public pageName: string = PageName.Portfolio;

  constructor(private cd: ChangeDetectorRef, private dialog: MatDialog, private sanitizer: DomSanitizer) {
    super();
    super.ngOnDestroy();
    this.cd.markForCheck();
  }

  public redirectToProject(details: ProjectDetails) {
    let project_url = details.url;
    if (project_url) {
      const sanitizedUrl = this.sanitizeDom(project_url);
      this.dialog.open(DialogContentComponent, {
        data: {
          url: sanitizedUrl,
          details: details
        }
      });
    }
  }

  private sanitizeDom(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
