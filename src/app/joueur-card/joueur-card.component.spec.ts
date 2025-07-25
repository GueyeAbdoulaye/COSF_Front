import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoueurCardComponent } from './joueur-card.component';

describe('JoueurCardComponent', () => {
  let component: JoueurCardComponent;
  let fixture: ComponentFixture<JoueurCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoueurCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoueurCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
