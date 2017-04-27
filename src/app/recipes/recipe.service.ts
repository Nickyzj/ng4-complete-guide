import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  
  recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe', 
      'This is simple a test', 
      'https://static01.nyt.com/images/2015/08/14/dining/14ROASTEDSALMON/14ROASTEDSALMON-articleLarge.jpg',
      [
        new Ingredient('meat', 3),
        new Ingredient('French fries', 20)
      ]
      ),
    new Recipe(
      'Another Test Recipe', 
      'This is simple a test 2', 
      'http://www.seriouseats.com/images/2015/09/20150914-pressure-cooker-recipes-roundup-09.jpg',
      [
        new Ingredient('pork', 6),
        new Ingredient('steak', 44)
      ]
      )
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
      return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }
}