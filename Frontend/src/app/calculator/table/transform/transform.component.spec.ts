import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformComponent } from './transform.component';

describe('TransformComponent', () => {
  let component: TransformComponent;
  let fixture: ComponentFixture<TransformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransformComponent]
    });
    fixture = TestBed.createComponent(TransformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
