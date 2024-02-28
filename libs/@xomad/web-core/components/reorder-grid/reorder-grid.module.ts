import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { XomadCoreButtonModule } from '@xomad/web-core/components/button';
import { XoReorderItemDirective } from './reorder-item.directive';
import { XoReorderGridComponent } from './reorder-grid.component';

export const COMPONENTS = [
    XoReorderGridComponent,
    XoReorderItemDirective,
];

@NgModule({
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS],
    imports: [
        CommonModule,
        DragDropModule,
        XomadCoreButtonModule,
    ],
})
export class XoReorderGridModule {
}
