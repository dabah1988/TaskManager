import { TestBed } from '@angular/core/testing';

import { ManageProjectServiceService } from './manage-project-service.service';

describe('ManageProjectServiceService', () => {
  let service: ManageProjectServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageProjectServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
