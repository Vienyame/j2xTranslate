import { TestBed, inject } from '@angular/core/testing';

import { EditorBoardService } from './editor-board.service';

describe('EditorBoardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditorBoardService]
    });
  });

  it('should be created', inject([EditorBoardService], (service: EditorBoardService) => {
    expect(service).toBeTruthy();
  }));
});
