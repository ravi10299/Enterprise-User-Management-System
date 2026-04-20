import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTables } from './user-tables';

describe('UserTables', () => {
  let component: UserTables;
  let fixture: ComponentFixture<UserTables>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTables],
    }).compileComponents();

    fixture = TestBed.createComponent(UserTables);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
