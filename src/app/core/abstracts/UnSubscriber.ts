import { Component, Directive, Injector, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Directive()

export abstract class UnSubscriber implements OnDestroy {
  public unsubscribe$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
