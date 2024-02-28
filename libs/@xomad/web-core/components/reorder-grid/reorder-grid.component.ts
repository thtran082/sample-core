import { CdkDragEnter, CdkDropList, CdkDropListGroup, DragRef, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { InputNumber } from '@xomad/web-core/utils';

import { XoSafeAny } from '@xomad/web-core/types';
import { XoReorderItemDirective } from './reorder-item.directive';

@Component({
  selector: 'xo-reorder-grid',
  templateUrl: './reorder-grid.component.html',
  styleUrls: ['./reorder-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--rows]': 'itemsPerRow',
  },
})
export class XoReorderGridComponent<T> implements AfterViewInit {
  @ViewChild(CdkDropListGroup) listGroup: CdkDropListGroup<CdkDropList>;
  @ViewChild(CdkDropList) placeholder: CdkDropList;
  @ContentChild(XoReorderItemDirective, { read: TemplateRef }) reorderItemTmpl: TemplateRef<any>;

  @Input() items: T[] = [];
  @Input() @InputNumber() itemsPerRow = 4;
  @Output() itemsChange = new EventEmitter<T[]>();

  target: CdkDropList = null;
  targetIndex: number;
  source: CdkDropList = null;
  sourceIndex: number;
  dragIndex: number;
  activeContainer: XoSafeAny;

  private dragRef: DragRef = null;

  ngAfterViewInit() {
    const phElement = this.placeholder.element.nativeElement;
    phElement.style.display = 'none';
    phElement.parentElement.removeChild(phElement);
  }

  dropListDropped() {
    if (!this.target)
      return;

    const phElement = this.placeholder.element.nativeElement;
    const parent = phElement.parentElement;

    phElement.style.display = 'none';

    parent.removeChild(phElement);
    parent.appendChild(phElement);
    parent.insertBefore(this.source.element.nativeElement, parent.children[this.sourceIndex]);

    if (this.placeholder._dropListRef.isDragging()) {
      this.placeholder._dropListRef.exit(this.dragRef);
    }

    this.target = null;
    this.source = null;
    this.dragRef = null;

    if (this.sourceIndex != this.targetIndex) {
      moveItemInArray(this.items, this.sourceIndex, this.targetIndex);
    }
  }

  onDropListEntered({ item, container }: CdkDragEnter) {
    if (container == this.placeholder) {
      return;
    }

    const placeholderElement: HTMLElement =
      this.placeholder.element.nativeElement;
    const sourceElement: HTMLElement = item.dropContainer.element.nativeElement;
    const dropElement: HTMLElement = container.element.nativeElement;
    const dragIndex: number = Array.prototype.indexOf.call(
      dropElement.parentElement.children,
      this.source ? placeholderElement : sourceElement,
    );
    const dropIndex: number = Array.prototype.indexOf.call(
      dropElement.parentElement.children,
      dropElement,
    );

    if (!this.source) {
      this.sourceIndex = dragIndex;
      this.source = item.dropContainer;
      sourceElement.parentElement.removeChild(sourceElement);
    }

    this.targetIndex = dropIndex;
    this.target = container;
    this.dragRef = item._dragRef;

    placeholderElement.style.display = '';

    dropElement.parentElement.insertBefore(
      placeholderElement,
      dropIndex > dragIndex ? dropElement.nextSibling : dropElement,
    );

    this.placeholder._dropListRef.enter(
      item._dragRef,
      item.element.nativeElement.offsetLeft,
      item.element.nativeElement.offsetTop,
    );
  }
}
