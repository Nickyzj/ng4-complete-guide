## 03 Course Project - The Basic

### Planning the App

1. Root
2. Header
  * Shopping List
    * Shopping List
    * Shopping List Edit
    * Ingredient
  * Recipe Book
    * Recipe Book
    * Recipe List
    * Recipe Item
    *Recipe Detail
 
```
npm install --save bootstrap
``` 

__.angular-cli.json__
```
"styles": [
        "../node_modules/bootstrap/dist/css/bootstrap.min.css",
        "styles.css"
      ],
```

### 03 App setup
```html
<div class="container">
  <div class="row">
    <div class="col-md-12">
      <h2>I'm working!</h2>
    </div>
  </div>
</div>
```

### 04
1. create a header folder
2. 
```javascript
import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

}
```
3. create html
```html
<h1>The Header</h1>
```

4. regist in app.module.ts
```javascript
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
```

### auto generate component

```
ng generate component recipes --spec false
```
(--spec false) means no test file

```
ng g c recipes/recipe-list --spec false
```
provide the path

```
ng g c recipes/recipe-detail --spec false
```
```
ng g c recipes/recipe-list/recipe-item --spec false
```
```
ng g c shopping-list --spec false
```
```
ng g c shopping-list/shopping-edit --spec false
```

### 05 

add components to app.component.html
```html
<app-header></app-header>
<div class="container">
  <div class="row">
    <div class="col-md-12">
      <app-recipes></app-recipes>
      <app-shopping-list></app-shopping-list>
    </div>
  </div>
</div>
```

recipes.component.html
```html
<div class="row">
  <div class="col-md-5">
    <app-recipe-list></app-recipe-list>
  </div>
  <div class="col-md-7">
    <app-recipe-detail></app-recipe-detail>
  </div>
</div>
```

recipe-list.component.html
```html
<app-recipe-item></app-recipe-item>
```

header.component.html
```html
<div class="navbar navbar-default">
    <div class="container-fluid">
        <div class="navbar-header">
            <a href="#" class="navbar-brand">Recipe Book</a>
        </div>

        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li><a href="#">Recipes</a></li>
                <li><a href="#">Shopping List</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" role="button">Manage <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Save Data</a></li>
                        <li><a href="#">Fetch Data</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</div>
```

recipe.model.ts
```javascript
export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;

    constructor(name: string, desc: string, imagePath: string) {
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
    }
}
```

recipe-list.component.ts
```javascript
import { Recipe } from '../recipe.model';

recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simple a test', 'https://static01.nyt.com/images/2015/08/14/dining/14ROASTEDSALMON/14ROASTEDSALMON-articleLarge.jpg')
  ];
```

recipe-list.component.html
```html
<div class="row">
  <div class="col-xs-12">
    <button class="btn btn-success">New Recipe</button>
  </div>
</div>
<div class="row">
  <div class="col-xs-12">
    <app-recipe-item></app-recipe-item>
  </div>
</div>

```

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
    <a href="#" class="list-group-item clearfix" *ngFor="let recipe of recipes">
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
    <app-recipe-item></app-recipe-item>
  </div>
</div>
```

recipe-detail.component.html
```html
<div class="row">
  <div class="col-xs-12">
    <img src="" alt="" class="img-responsive">
  </div>
</div>
<div class="row">
  <div class="col-xs-12">
    <h1>Recipe Name</h1>
  </div>
</div>
<div class="row">
  <div class="col-xs-12">
    <div class="btn-group">
      <button type="button" class="btn btn-primary dropdown-toggle">
        Manage Recipe <span class="caret"></span>
      </button>
      <ul class="dropdown-menu">
        <li><a href="#">To Shopping List</a></li>
        <li><a href="#">Edit Recipe</a></li>
        <li><a href="#">Delete Recipe</a></li>
      </ul>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-xs-12">
    Description
  </div>
</div>
<div class="row">
  <div class="col-xs-12">
    Ingredients
  </div>
</div>
```

ingredient.model.ts
```javascript
export class Ingredient {
    constructor (public name: string, public amount: number) {
    }
}
```

shopping-list.component.ts
```javascript
import { Ingredient } from '../shared/ingredient.model';

ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomato', 10)
  ];
```

shopping-list.component.html
```html
<div class="row">
  <div class="col-xs-10">
    <app-shopping-edit></app-shopping-edit>
    <hr>
    <ul class="list-group">
      <a 
        class="list-group-item" 
        style="cursor: pointer"
        *ngFor="let ingredient of ingredients"
        >
          {{ ingredient.name }} ({{ ingredient.amount }})
        </a>
    </ul>
  </div>
</div>
```

shopping-edit.component.html
```html
<div class="row">
  <div class="col-xs-12">
    <form action="">
      <div class="row">
        <div class="col-sm-5 form-group">
          <label for="name">Name</label>
          <input type="text" id="name" class="form-control">
        </div>
        <div class="col-sm-2 form-group">
          <label for="amount">Amount</label>
          <input type="number" id="amount" class="form-control">
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <button class="btn btn-success" type="submit">Add</button>
          <button class="btn btn-danger" type="button">Delete</button>
          <button class="btn btn-primary" type="button">Clear</button>
        </div>
      </div>
    </form>
  </div>
</div>
```