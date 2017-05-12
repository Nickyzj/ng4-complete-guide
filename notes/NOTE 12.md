# Routing Course Project

## Set up the routes
app-routing.module.ts
```javascript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipesComponent },
    { path: 'shopping-list', component: ShoppingListComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
```

app.module.ts
```javascript
import { AppRoutingModule } from './app-routing.module';

imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
```

app.component.html
```html
<app-header (featureLoaded)="onNavigate($event)"></app-header>
<div class="container">
  <div class="row">
    <div class="col-md-12">
      <router-outlet></router-outlet>
    </div>
  </div>
</div>
```
---
## Add navigation

header.component.html
```html
<li><a routerLink="/recipes">Recipes</a></li>
<li><a routerLink="/shopping-list">Shopping List</a></li>
```
---
## Marking active routes

header.component.html
```html
<li routerLinkActive="active"><a routerLink="/recipes">Recipes</a></li>
<li routerLinkActive="active"><a routerLink="/shopping-list">Shopping List</a></li>
           
```
---
## Fixing page reload

remove `href="#" ` in recipe-item.component.html

add:
```html
style="cursor: pointer;"
```
---
## Adding child routing

```
ng g c recipes/recipe-start --spec false
```
---
## Pass dynamic params
recipe-list.component.html
```html
<app-recipe-item 
      *ngFor="let recipeEl of recipes; let i = index"
      [recipe]="recipeEl"
      [index]="i"></app-recipe-item>
```
recipe-item.component.ts
```javascript
@Input() index: number;
```
recipe-item.component.html
```html
<a 
  style="cursor: pointer;"
  [routerLink]="[index]"
  class="list-group-item clearfix">
```
recipe-detail.component.ts
```javascript
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }
```
---
## Adding editing routes
```
ng g c recipes/recipe-edit --spec false
```
