import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkComponent } from './link.component';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  template: `
    <app-link [link]="['/example']" type="primary">Visit Example</app-link>
  `
})
class TestHostComponent {}

describe('LinkComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let linkElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, LinkComponent], 
      declarations: [TestHostComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: {
                get(): number {
                  return 6;
                }
              }
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    linkElement = fixture.nativeElement.querySelector('a');
  });

  it('should create the link component', () => {
    expect(linkElement).toBeTruthy();
  });

  it('should render the correct routerLink and variant', () => {
    expect(linkElement.getAttribute('ng-reflect-router-link')).toBe('/example');
    expect(linkElement.classList).toContain('bg-primary-500');
    expect(linkElement.classList).toContain('hover:bg-primary-800');
  });

  it('should render the correct content', () => {
    expect(linkElement.textContent).toBe('Visit Example');
  });
});
