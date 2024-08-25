So, this library has tailwindcss as a dependency, ofcourse!

## Installation

After creating your project with

```
ng new <app-name>
cd <app-name>
```

execute bellow command
```
npm i ngx-tailwind-toastify
```
to install the library. 

## Setup

If you already have tailwindcss installed you can skip this installation part and skip to setting up tailwind.config.js file
If you don't have installed tailwind css yet, then now's the time

execute bellow command to install tailwindcss
```
npm install -D tailwindcss postcss autoprefixer
```
And the next one to generate the tailwind.config.js file
```
npx tailwindcss init
```

Update this file to include the library files as well

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/ngx-tailwind-toastify/**/*.{html,ts,css,scss,mjs}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

And Finally add tailwind directives to your styles.css or styles.scss file
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Now, as this library is for Angular 18 and above we should have app.config.ts file. 
We need to add a provider of this library to this file
Bellow is the sample app.config.ts

```typescript
import { provideNgxTailwindToastify } from 'ngx-tailwind-toastify';

export const appConfig: ApplicationConfig = {
  providers: [
    .
    .
    provideNgxTailwindToastify(),
  ],
};
```

## Use

Import NgxTailwindToastifyComponent in your desired Angular component and initilize it as shown bellow.
```typescript
import { Component, RendererFactory2 } from '@angular/core';
import { NgxTailwindToastifyComponent } from 'ngx-tailwind-toastify';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'test-project';

  toast: NgxTailwindToastifyComponent;

  constructor(private renderer: RendererFactory2) {
    this.toast = new NgxTailwindToastifyComponent(renderer);
  }
}
```
We are modifying the DOM at the runtime to display the toast messages, hence it requires intance of RendererFactory2

Bellow is the example to show a success toast

```typescript
this.toast.show({
  type: 'success',
  message: 'Operation successful!',
});
```

Options object has the bellow properties and possible values

```typescript
interface options {
  type: string;                  // 'error' | 'success' | 'warn' | 'info'
  message: string;               
  position?: [string, string];   //   [ 'top' | 'bottom', 'left' | 'right']
  animation?: string;            //   'fadeIn' | 'slideIn'
  messageDuration?: number;      //   duration in miliseconds
}
```
