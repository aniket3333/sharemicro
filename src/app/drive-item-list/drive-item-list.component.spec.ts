import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveItemListComponent } from './drive-item-list.component';

describe('DriveItemListComponent', () => {
  let component: DriveItemListComponent;
  let fixture: ComponentFixture<DriveItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriveItemListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriveItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
