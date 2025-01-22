import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivesSitesListComponent } from './drives-sites-list.component';

describe('DrivesSitesListComponent', () => {
  let component: DrivesSitesListComponent;
  let fixture: ComponentFixture<DrivesSitesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrivesSitesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrivesSitesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
