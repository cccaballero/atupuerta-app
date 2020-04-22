import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EatItemComponent } from './eat-item.component';

describe('EatItemComponent', () => {
  let component: EatItemComponent;
  let fixture: ComponentFixture<EatItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EatItemComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EatItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
