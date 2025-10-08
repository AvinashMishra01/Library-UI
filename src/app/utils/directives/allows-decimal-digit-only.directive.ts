import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAllowsDecimalDigitOnly]',
  standalone:true
})
export class AllowsDecimalDigitOnlyDirective {

  regexStr = /^[0-9.]+$/;
  constructor() { }
  @HostListener('keydown',['$event'])
  onKeyDown(event:KeyboardEvent){
    if(new RegExp(this.regexStr).test(event.key) || (event.ctrlKey || (event.key == 'v' || event.key == 'c')) || (event.key === "Backspace" || event.key==="Tab") || (event.key === 'ArrowRight' || event.key === 'ArrowLeft')){
      return true;
    }else{
      event.preventDefault();
      return false;
    }
}
}
