import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductsAddPage } from './products-add.page';

describe('ProductsAddPage', () => {
  let component: ProductsAddPage;
  let fixture: ComponentFixture<ProductsAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
