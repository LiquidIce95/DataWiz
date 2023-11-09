import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DescriptiveComponent } from './descriptive.component';
import { TableDataService } from '../../services/table.service';
import { FormsModule } from '@angular/forms';

fdescribe('DescriptiveComponent', () => {
  let component: DescriptiveComponent;
  let fixture: ComponentFixture<DescriptiveComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescriptiveComponent],
      providers: [TableDataService],
      imports: [FormsModule],

    });
  
    fixture = TestBed.createComponent(DescriptiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  

});
