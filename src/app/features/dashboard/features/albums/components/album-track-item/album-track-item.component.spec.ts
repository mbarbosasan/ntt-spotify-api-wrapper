import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumTrackItemComponent } from './album-track-item.component';

describe('AlbumTrackItemComponent', () => {
  let component: AlbumTrackItemComponent;
  let fixture: ComponentFixture<AlbumTrackItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumTrackItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlbumTrackItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
