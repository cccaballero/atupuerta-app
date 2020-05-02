import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IonImgCacheComponent } from './ion-img-cache.component';

describe('IonImgCacheComponent', () => {
  let component: IonImgCacheComponent;
  let fixture: ComponentFixture<IonImgCacheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IonImgCacheComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IonImgCacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
