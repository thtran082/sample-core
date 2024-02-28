import {Injectable, OnDestroy} from "@angular/core";
import {Subject} from "rxjs";

@Injectable()
export class XoDestroyService extends Subject<void> implements OnDestroy {
  ngOnDestroy(): void {
    this.next();
    this.complete();
  }
}
