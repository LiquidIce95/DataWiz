import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptiveComponent } from './descriptive.component';

describe('DescriptiveComponent', () => {
  let component: DescriptiveComponent;
  let fixture: ComponentFixture<DescriptiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescriptiveComponent]
    });
    fixture = TestBed.createComponent(DescriptiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
