import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoChatComponent } from './nuevo-chat.component';

describe('NuevoChatComponent', () => {
  let component: NuevoChatComponent;
  let fixture: ComponentFixture<NuevoChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
