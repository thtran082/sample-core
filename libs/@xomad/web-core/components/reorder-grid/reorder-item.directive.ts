import { Directive } from '@angular/core';

interface Context<TContextItem> {
  $implicit: TContextItem;
  index: number;
}

@Directive({
  selector: 'ng-template[xoReorderItem]',
})
export class XoReorderItemDirective<TItem> {
  static ngTemplateContextGuard<TContextItem extends object>(
    _: XoReorderItemDirective<TContextItem>,
    ctx: unknown
  ): ctx is Context<TContextItem> {
    return true;
  }
}
