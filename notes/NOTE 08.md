## add the dropdown directive

```
ng g d shared/dropdown
```

dropdown.directive.ts
```javascript
import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  constructor() { }

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
```
recipe-detail.component.html
```html
<div class="btn-group" appDropdown>
```
header.component.html
```html
<li class="dropdown" appDropdown>
```