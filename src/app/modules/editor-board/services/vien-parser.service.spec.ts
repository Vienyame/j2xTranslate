import { TestBed, inject } from '@angular/core/testing';

import { VienParserService } from './vien-parser.service';

describe('VienParserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VienParserService]
    });
  });

  it('should be created', inject([VienParserService], (service: VienParserService) => {
    expect(service).toBeTruthy();
  }));
});
