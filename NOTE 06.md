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
---
## recipe list and item property binding

recipe-list.component.html
```html
<div class="row">
  <div class="col-xs-12">
    <button class="btn btn-success">New Recipe</button>
  </div>
</div>
<hr>
<div class="row">
  <div class="col-xs-12">
    <app-recipe-item 
      *ngFor="let recipeEl of recipes"
      [recipe]="recipeEl"></app-recipe-item>
  </div>
</div>
```
recipe-item.component.html
```html
<a href="#" class="list-group-item clearfix">
  <div class="pull-left">
    <h4 class="list-group-item-heading">{{ recipe.name}}</h4>
    <p class="list-group-item-text">{{ recipe.description }}</p>
  </div>
  <span class="pull-right">
    <img 
      [src]="recipe.imagePath" 
      alt="{{ recipe.name }}" 
      class="img-responsive" style="max-height: 50px;">
  </span>
</a>
```
recipe-item.component.ts
```javascript
@Input() recipe: Recipe;
```
---
## select recipe property and event binding

recipe-item.component.html
```html
<a href="#" class="list-group-item clearfix"
  (click)="onSelected()">
```
recipe-item.component.ts
```javascript
@Output() recipeSelected = new EventEmitter<void>();

onSelected() {
    this.recipeSelected.emit();
  }
```
recipe-list.component.html
```html
<app-recipe-item 
      *ngFor="let recipeEl of recipes"
      [recipe]="recipeEl"
      (recipeSelected)="onRecipeSelected(recipeEl)"></app-recipe-item>
```

recipe-list.component.ts
```javascript
@Output() recipeWasSelected = new EventEmitter<Recipe>();

onRecipeSelected(recipeEl: Recipe) {
    this.recipeWasSelected.emit(recipeEl);
  }
```
recipes.component.html
```html
<app-recipe-list
      (recipeWasSelected)="selectedRecipe = $event"></app-recipe-list>
```
recipes.component.ts
```javascript
selectedRecipe: Recipe;
```
recipes.component.html
```html
<app-recipe-detail
      *ngIf="selectedRecipe else infoText"
      [recipe]="selectedRecipe"></app-recipe-detail>
      <ng-template #infoText>
        <p>Please select a Recipe</p>
      </ng-template>
```

recipe-detail.component.ts
```javascript
@Input() recipe: Recipe;
```


