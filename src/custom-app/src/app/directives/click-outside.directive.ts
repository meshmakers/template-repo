import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  private readonly elementRef = inject(ElementRef);

  @Input() appClickOutsideEnabled = true;
  @Output() appClickOutside = new EventEmitter<MouseEvent>();

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this.appClickOutsideEnabled) {
      return;
    }
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.appClickOutside.emit(event);
    }
  }
}
