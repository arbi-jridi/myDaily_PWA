import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDailyComponent } from './my-daily.component';

describe('MyDailyComponent', () => {
  let component: MyDailyComponent;
  let fixture: ComponentFixture<MyDailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDailyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
