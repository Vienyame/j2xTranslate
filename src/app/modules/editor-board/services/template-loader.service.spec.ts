import { TestBed, inject } from '@angular/core/testing';

import { TemplateLoaderService } from './template-loader.service';

describe('TemplateLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TemplateLoaderService]
    });
  });

  it('should be created', inject([TemplateLoaderService], (service: TemplateLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
