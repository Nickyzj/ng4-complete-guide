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
---
## Shopping list from add ingredient

shopping-edit.component.html
```html
<div class="row">
  <div class="col-xs-12">
    <form action="">
      <div class="row">
        <div class="col-sm-5 form-group">
          <label for="name">Name</label>
          <input type="text" id="name" class="form-control" #nameInput>
        </div>
        <div class="col-sm-2 form-group">
          <label for="amount">Amount</label>
          <input type="number" id="amount" class="form-control" #amountInput>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <button class="btn btn-success" type="submit" (click)="onAddItem()">Add</button>
          <button class="btn btn-danger" type="button">Delete</button>
          <button class="btn btn-primary" type="button">Clear</button>
        </div>
      </div>
    </form>
  </div>
</div>
```

shopping-edit.component.ts
```javascript
import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit() {
  }

  onAddItem() {
    console.log('helllll');
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.ingredientAdded.emit(newIngredient);
  }

}
```

shopping-list.component.html
```html
<app-shopping-edit
      (ingredientAdded)="onIngredientAdded($event)"></app-shopping-edit>
```

shopping-list.component.ts
```javascript
onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
```