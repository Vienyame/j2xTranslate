import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {EditorBoardService} from "@j2xT/modules/editor-board/services/editor-board.service";
import {VienParserService} from "@j2xT/modules/editor-board/services/vien-parser.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit, AfterViewInit {

  public vienData$: Observable<any>;
  @ViewChild('view') viewElement: ElementRef;

  constructor(private _editorBoardService: EditorBoardService,
              private _vienParserService: VienParserService,
              private sanitizer: DomSanitizer,
              private renderer: Renderer2,
              private el: ElementRef) {
    this.vienData$ = this._editorBoardService.fetchEditorTemplateFile()
      .map(data => this._vienParserService.parser(data));
    //.map(data => this.sanitizer.bypassSecurityTrustHtml(data))
    //.switchMap(data => Observable.of(this.sanitizer.bypassSecurityTrustHtml(this._vienParserService.parser(data))));

    this.vienData$.subscribe(data => {
      console.log(data)
    })
  }

  ngOnInit() {

    this.vienData$.subscribe(data => {
      console.log(data);
      console.log(data.children[0].children[3]);
      this.renderer.appendChild(this.viewElement.nativeElement, document.createElement('folder_node'))
      //this.viewElement.nativeElement.insertAdjacentHTML('beforeend', '<div class="two">two</div>');
    });

    // this.sanitizer.bypassSecurityTrustHtml(this._vienParserService.parser(data))

    // this.vienData$.subscribe(data => console.log(data.children[0]))

    this.vienData$.switchMap(data => {
        const oSerializer = new XMLSerializer();
        const sXML = oSerializer.serializeToString(data.children[0].children[3]);
        return this._vienParserService.vien2json(sXML.replace(/\s/g, ''))
      }
    ).subscribe(data => {
      console.log(data)
    })


  }

  ngAfterViewInit(): void {
  }

}
