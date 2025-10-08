import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputDigitOnly]', // ✅ must match your template usage
  standalone: true,                // since you’re importing it directly
})
export class InputDigitOnlyDirective {
  regexStr = /^[0-9]+$/;

  constructor() {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    console.log('Key pressed:', event.key); // ✅ add this for debugging

    if (
      new RegExp(this.regexStr).test(event.key) ||
      event.ctrlKey ||
      event.metaKey ||
      ['Backspace', 'Tab', 'Delete'].includes(event.key) ||
      event.key === 'ArrowRight' ||
      event.key === 'ArrowLeft'
    ) {
      return true;
    } else {
      event.preventDefault(); // ✅ you must prevent default here
      return false;
    }
  }

  @HostListener('paste', ['$event'])
  blockPaste(event: ClipboardEvent) {
    console.log('Paste detected'); // ✅ add for debugging
    this.validateFields(event);
  }

  validateFields(event: ClipboardEvent) {
    const pasteData = event.clipboardData?.getData('text/plain') ?? '';
    if (!new RegExp(this.regexStr).test(pasteData)) {
      event.preventDefault();
    }
  }
}
