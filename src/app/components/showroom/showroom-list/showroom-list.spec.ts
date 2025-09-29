import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowroomList } from './showroom-list';

describe('ShowroomList', () => {
  let component: ShowroomList;
  let fixture: ComponentFixture<ShowroomList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowroomList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowroomList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
