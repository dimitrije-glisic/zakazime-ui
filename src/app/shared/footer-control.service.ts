import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FooterControlService {

  private showFooter = new BehaviorSubject<boolean>(true);
  public showFooter$ = this.showFooter.asObservable();

  constructor() { }

  public hideFooter(): void {
    this.showFooter.next(false);
  }

  public displayFooter(): void {
    this.showFooter.next(true);
  }
}
