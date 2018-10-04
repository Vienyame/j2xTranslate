import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptNodeComponent } from './concept-node.component';

describe('ConceptNodeComponent', () => {
  let component: ConceptNodeComponent;
  let fixture: ComponentFixture<ConceptNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConceptNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
