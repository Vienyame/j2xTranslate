import {AfterViewInit, Component, Inject, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {EditorBoardService} from "@j2xT/modules/editor-board/services/editor-board.service";
import {VienParserService} from "@j2xT/modules/editor-board/services/vien-parser.service";
import {Observable} from "rxjs";
import 'rxjs/add/operator/switchMap';
import {TemplateLoaderService} from "@j2xT/modules/editor-board/services/template-loader.service";
import {DomSanitizer} from "@angular/platform-browser";
import {ViewerComponent} from "@j2xT/modules/editor-board/components/viewer/viewer.component";

@Component({
  selector: 'app-editor-board',
  templateUrl: './editor-board.component.html',
  styleUrls: ['./editor-board.component.scss']
})
export class EditorBoardComponent implements OnInit, AfterViewInit{

  @ViewChild('viewer', {read: ViewContainerRef}) viewContainerRef: ViewContainerRef;

  constructor(@Inject(TemplateLoaderService) private _templateLoaderService,) {
  }

  ngOnInit() {
    this._templateLoaderService.setRootViewContainerRef(this.viewContainerRef);
    this._templateLoaderService.addDynamicComponent(ViewerComponent);
  }

  ngAfterViewInit(): void {

  }

}
