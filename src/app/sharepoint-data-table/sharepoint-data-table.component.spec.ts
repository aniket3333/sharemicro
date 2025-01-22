import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharepointDataTableComponent } from './sharepoint-data-table.component';

describe('SharepointDataTableComponent', () => {
  let component: SharepointDataTableComponent;
  let fixture: ComponentFixture<SharepointDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharepointDataTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharepointDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
