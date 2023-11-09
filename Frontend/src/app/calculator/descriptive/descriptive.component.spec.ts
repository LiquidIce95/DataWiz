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

  describe('cleanSeelctedVariables' , ()=>{
    it('cleanSelectedVariables should do nothing', () => {
      component.selectedVariables = {'name': true, 'age': true, 'income':false};
      component.tableDataService['tableData'] = [{'name':'bob','age':40, 'income':100}]
      component.cleanSelectedVariables();
      expect(component.selectedVariables).toEqual({'name': true, 'age':true, 'income':false});
    });

    it('cleanSelectedVariables should delte name', () => {
      component.selectedVariables = {'name': false, 'age': false, 'income':false};
      component.tableDataService['tableData'] = [{'age':40, 'income':100}];
      component.tableDataService['tableKeys'] = ['age','income'];
      component.cleanSelectedVariables();
      expect(component.selectedVariables).toEqual({'age':false, 'income':false});
    });

    it('cleanSelectedVariables should del everything', () => {
      component.selectedVariables = {'name': true, 'age': true, 'income':false};
      component.tableDataService['tableData'] = [{'id':10, 'birthday':'19.05.1994'}];
      component.tableDataService['tableKeys'] = ['id', 'birthday'];
      component.cleanSelectedVariables();
      expect(component.selectedVariables).toEqual({});
    });


  });

  describe('getAverages',()=>{

    it('single value', () => {
      component.tableDataService['tableData'] =
      [
        { name: 'John', age: 30, income: 0 },
        
      ];
      component.selectedVariables = {'age': true};
      component.getAverages();
      expect(component.averages['age']).toBe(30);
    });
  
    it('compute average', () => {
      component.tableDataService['tableData'] =
      [
        { name: 'John', age: 30, income: 0 },
        { name: 'Alice', age: 25, income: 100 },
      ];      
      component.selectedVariables = {'age': true, 'income': false};
      component.getAverages();
      expect(component.averages['age']).toBe(27.5);
    });

    it('ignore unselected Var', () => {
      component.tableDataService['tableData'] =
      [
        { name: 'John', age: 30, income: 0 },
        { name: 'Alice', age: 25, income: 100 },
      ];      
      component.selectedVariables = {'age': true, 'income': false};
      component.getAverages();
      expect('income' in component.averages).toBe(false);
    });
  
  });

  describe('getAverageKeys',()=>{
    it('one key', () => {
      component.tableDataService['tableData'] =
      [
        { name: 'John', age: 30, income: 0 },
        { name: 'Alice', age: 25, income: 100 },
      ];  
      component.selectedVariables = {'age': true};
      const keys = component.getAverageKeys();
      expect(keys).toEqual(['age']);
    });

    it('no key', () => {
      component.tableDataService['tableData'] =
      [
        { name: 'John', age: 30, income: 0 },
        { name: 'Alice', age: 25, income: 100 },
      ];  
      component.selectedVariables = {'age': false, 'name':false,'income':false};
      component.getAverages()
      const keys = component.getAverageKeys();
      expect(keys).toEqual([]);
    });

    it('two keys', () => {
      component.tableDataService['tableData'] =
      [
        { name: 'John', age: 30, income: 0 },
        { name: 'Alice', age: 25, income: 100 },
      ];  
      component.selectedVariables = {'age': true, 'name':false,'income':true};
      component.getAverages()
      const keys = component.getAverageKeys();
      expect(keys).toEqual(['age','income']);
    });

  })
  

});
