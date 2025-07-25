import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectifComponent } from './effectif.component';

describe('EffectifComponent', () => {
  let component: EffectifComponent;
  let fixture: ComponentFixture<EffectifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EffectifComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EffectifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
