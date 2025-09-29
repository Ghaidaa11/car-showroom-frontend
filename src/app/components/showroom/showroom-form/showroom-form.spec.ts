import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowroomForm } from './showroom-form';

describe('ShowroomForm', () => {
  let component: ShowroomForm;
  let fixture: ComponentFixture<ShowroomForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowroomForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowroomForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
