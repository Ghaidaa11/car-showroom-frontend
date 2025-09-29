import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowroomDetails } from './showroom-details';

describe('ShowroomDetails', () => {
  let component: ShowroomDetails;
  let fixture: ComponentFixture<ShowroomDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowroomDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowroomDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
