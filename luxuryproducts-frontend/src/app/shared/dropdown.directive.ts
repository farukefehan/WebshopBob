import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class dropdownDirective {
    @HostBinding('class.open') isOpen = false;

    @HostListener('click') toggleOpen(){
        this.isOpen = !this.isOpen;

    }
}