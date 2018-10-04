import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorBoardComponent } from './editor-board.component';

describe('EditorBoardComponent', () => {
  let component: EditorBoardComponent;
  let fixture: ComponentFixture<EditorBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
