import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditorBoardComponent} from './containers/editor-board.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "@j2xT/shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";
import {EditorBoardService} from "@j2xT/modules/editor-board/services/editor-board.service";
import {VienParserService} from "@j2xT/modules/editor-board/services/vien-parser.service";
import {TemplateLoaderService} from "@j2xT/modules/editor-board/services/template-loader.service";
import {FolderNodeComponent} from "@j2xT/modules/editor-board/components/folder-node/folder-node.component";
import {ConceptNodeComponent} from "@j2xT/modules/editor-board/components/concept-node/concept-node.component";
import {ViewerComponent} from "@j2xT/modules/editor-board/components/viewer/viewer.component";

const COMPONENTS = [EditorBoardComponent, FolderNodeComponent, ConceptNodeComponent];
const SERVICES = [EditorBoardService, VienParserService, TemplateLoaderService];

export const routes: Routes = [
  {
    path: '',
    component: EditorBoardComponent,
    data: {
      title: 'PUBLIC.EDITOR.PAGE_TITLE',
      description: 'PUBLIC.EDITOR.META_DESCRIPTION'
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    TranslateModule
  ],
  declarations: [...COMPONENTS, ViewerComponent],
  providers: [...SERVICES],
  exports: [...COMPONENTS],
  entryComponents: [ViewerComponent]
})
export class EditorBoardModule {
}
