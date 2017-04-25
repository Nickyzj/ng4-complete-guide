# Course Project Components and Data binding

## navigation with event binding and ngif

header.component.html
```html
<li><a href="#" (click)="onSelect('recipes')">Recipes</a></li>
                <li><a href="#" (click)="onSelect('shopping-list')">Shopping List</a></li>
```
header.component.ts
```javascript
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    @Output() featureLoaded = new EventEmitter<string>();

    onSelect(feature: string) {
        this.featureLoaded.emit(feature);
    }
}
```
app.component.html
```html
<app-recipes *ngIf="loadedFeature === 'recipes'"></app-recipes>
      <app-shopping-list *ngIf="loadedFeature !== 'recipes'"></app-shopping-list>
```
app.component.ts
```javascript
loadedFeature = 'recipes';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
```