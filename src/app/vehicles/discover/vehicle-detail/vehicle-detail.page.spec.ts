import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { VehicleDetailPage } from './vehicle-detail.page';

describe('VehicleDetailPage', () => {
  let component: VehicleDetailPage;
  let fixture: ComponentFixture<VehicleDetailPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VehicleDetailPage],
        imports: [IonicModule.forRoot(), ReactiveFormsModule],
      }).compileComponents();

      fixture = TestBed.createComponent(VehicleDetailPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
