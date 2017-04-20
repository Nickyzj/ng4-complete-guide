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
