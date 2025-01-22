import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSitesListComponent } from './all-sites-list.component';

describe('AllSitesListComponent', () => {
  let component: AllSitesListComponent;
  let fixture: ComponentFixture<AllSitesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllSitesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSitesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
