import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowroomUpdate } from './showroom-update';

describe('ShowroomUpdate', () => {
  let component: ShowroomUpdate;
  let fixture: ComponentFixture<ShowroomUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowroomUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowroomUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
