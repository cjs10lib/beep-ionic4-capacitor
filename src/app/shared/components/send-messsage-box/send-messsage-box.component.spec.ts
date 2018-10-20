import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMesssageBoxComponent } from './send-messsage-box.component';

describe('SendMesssageBoxComponent', () => {
  let component: SendMesssageBoxComponent;
  let fixture: ComponentFixture<SendMesssageBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendMesssageBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendMesssageBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
