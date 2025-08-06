import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscrisComponent } from './inscris.component';

describe('InscrisComponent', () => {
  let component: InscrisComponent;
  let fixture: ComponentFixture<InscrisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscrisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscrisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
