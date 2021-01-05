#Tailwindcss

When we write html and css, it's common to have to jump back and forth between css and html files to get an understanding of what's going on. This is most apparent when global styles are used - we find ourselves in multiple css files, our html and in the browser inspector trying to figure out what's going on. Wouldn't it be nice to make the change in one place?

Bootstrap 4 was one of the first frameworks to introduce a small set of utility classes. The problem with an incomplete set of utility classes is that you'll find yourself writing regular css and using the utility classes, which means you're still bouncing between files.

Then along came Tailwind! Tailwind is a css utility framework that lets you write your html without ever leaving that file.

Some advantages are:

<ul>
<li>No need for other css frameworks and color variables to have consistent colors throughout your application</li>
<li>Easy to create consistent spacing throughout your application</li>
</ul>

## Using tailwind with angular

This dev day is tested for angular 10. It is recommended you use the latest angular 10 cli.

```
npm uninstall -g @angular/cli
npm cache clean
npm install -g @angular/cli@^10
```


## Setting up an angular application configured to use tailwindcss

Skip the install because we will use yarn instead of npm

```
ng new --skip-install angular-tailwind
cd angular-tailwind
yarn install
```

### Add some additional dependencies and configure

**For Angular 11**
```
yarn add @angular-builders/custom-webpack
yarn add --dev tailwindcss autoprefixer postcss postcss-import postcss-loader postcss-scss
```

**For Angular 10**
```
ng add ngx-build-plus
yarn add --dev tailwindcss autoprefixer postcss postcss-import postcss-loader postcss-scss
```

Add a custom webpack.config.js

```
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            ident: 'postcss',
            syntax: 'postcss-scss',
            plugins: [
              require('postcss-import'),
              require('tailwindcss'),
              require('autoprefixer'),
            ],
          },
        },
      },
    ],
  },
};
```

Edit the angular.json to reference your webpack config. You'll need to do this in the build, serve, and test sections.

**For Angular 11**
```
...
"build": {
          "builder": "@angular-builders/custom-webpack:browser",
          "options": {
            "customWebpackConfig": {
              "path": "./webpack.config.js",
              "mergeRules": {
                   "module": {
                      "rules": "append"
                    }
              }
          },
...
"serve": {
          "builder": "@angular-builders/custom-webpack:dev-server",
          "options": {
            "browserTarget": "angular-tailwind:build"
          },
...

```

**For Angular 10**
```
...
options: {
  "extraWebpackConfig": "webpack.config.js",
...
}
...
```

Generate the tailwind config

```
npx tailwind init
```

Configure the purge option in the newly generated tailwind.config.js. This will configure tailwind to eliminiate any unused utility classes in the build process.

**Note: When your application is built without the purge option, your styles will be approximately 3MB. Running with purge enabled can slow down local development and reload times however.

**For Angular 11**
Do NOT true purge on while developing your styles will not reload when using ng serve or yarn start


**For Angular 10**
```
purge: {
  enabled: true,
  content: [
    './src/**/*.html',
    './src/**/*.scss'
  ]
},
```

To your styles.scss add

```
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

Edit your app.component.html

```
<div class="m-10">
  <div class="rounded border border-gray-300 p-4 flex">
    hello tailwind
  </div>
</div>
```

Start up your application!

```
yarn start
```

### Exercise 1 - flex refresher

This section is optional if you're already familiar with flex. We're not going to cover flex in depth, but only how to horizontally and vertically align elements in a flex row.

```
git checkout 1a-start
```

Tailwind has the following utility classes that you'll need. In a flex row, they behave as follows:

- items-start (vertically position top - this is the default so you won't need to write it)
- items-center (vertically position center)
- items-end (vertically position bottom)
- justify-start (horizontally position at start - this is the default so you won't need to write it)
- justify-center (horizontally position center)
- justify-end (horizontally position bottom)

When you load the application, there is a red square displayed in a blue square.

####1a. vertically and horizontally center the red square inside the blue square.


<details><summary>Answer</summary><p>

```
<div class="m-10">
  <div class="h-80 w-80 bg-blue-500 flex items-center justify-center">
    <div class="h-20 w-20 bg-red-500"></div>
  </div>
</div>
```
</p></details>


####1b. vertically center the red square inside the blue square. horizontally the red square should be at the start


<details><summary>Answer</summary><p>

```
<div class="m-10">
  <div class="h-80 w-80 bg-blue-500 flex items-center">
    <div class="h-20 w-20 bg-red-500"></div>
  </div>
</div>
```
</p></details>

####1c. vertically center the red square inside the blue square. horizontally the red square should be at the end.


<details><summary>Answer</summary><p>

```
<div class="m-10">
  <div class="h-80 w-80 bg-blue-500 flex items-center justify-end">
    <div class="h-20 w-20 bg-red-500"></div>
  </div>
</div>
```
</p></details>


### Exercise 2 - make a chip component

Chips are compact elements that represent an input, attribute, or action. Let's make one

![](chip.png)


```
git checkout 2-start
```

To make a chip we'll break it up into 2 steps.
- create an avatar component
- create an svg button component
- create the chip component

####2a. Use tailwind **html classes** to create an avatar component (don't write things in any scss files).


```
ng g c avatar
```

avatar.component.ts
```
import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  styles: [`
    :host {
      display: inline-block;
    }
  `
  ]
})
export class AvatarComponent {

  @Input() label: string;
}
```
Desired result:

![](avatar.png)


Component specification:

- 1.5rem height ([tailwind height](https://tailwindcss.com/docs/height))
- 1.5rem width  ([tailwind width](https://tailwindcss.com/docs/width))
- the background is red-500 ([tailwind background color](https://tailwindcss.com/docs/background-color))
- the text should be horizontally and vertically centered in the circle
- a circle ([tailwind rounded corners](https://tailwindcss.com/docs/border-radius#rounded-corners))
- text should be white  ([tailwind text color])(https://tailwindcss.com/docs/text-color)


<details><summary>Answer</summary><p>

```
git checkout 2a-answer
```

```
<div class="h-6 w-6 rounded-full bg-red-500 text-white flex items-center justify-center">
  {{label}}
</div>
```

</p></details>

####2b. Use the tailwind [@apply](https://tailwindcss.com/docs/functions-and-directives#apply) to move your html classes into your scss file.

```
git checkout 2b-start
```

<details><summary>Answer</summary><p>

```
git checkout 2b-answer
```

```
avatar.component.html

<div class="avatar">
  {{label}}
</div>

avatar.component.scss

.avatar {
  @apply h-6 w-6 rounded-full bg-red-500 text-white flex items-center justify-center;
}

```

</p></details>

####2c. Create an svg-button component

Desired result:

![](svg-button.png)


```
git checkout 2c-start
```

In this branch an app-svg component has already been created for you.

```
ng g c svg-button
```

Component specification:

- 1.5rem height
- 1.5rem width
- the background is gray-200
- when hovered, the background should transition to gray-300 over 200ms
- the cursor should be a pointer
- the X should be vertically and horizontally centered
- a circle


<details><summary>Answer</summary><p>

```
git checkout 2c-answer
```

```
svg-button.component.html

<div class="svg-button-wrapper">
  <app-svg [name]="name"></app-svg>
</div>


svg-button.component.scss

:host {
  @apply inline-flex;
}

.svg-button-wrapper {
  @apply inline-flex items-center justify-center h-6 w-6 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300;
  transition: background-color 200ms ease-in-out;
}

```

</p></details>


####2d. Create the chip component

Desired result:

![](chip.png)

```
git checkout 2d-start
```

A chip component was already created in the 2d-start branch. Fill it out to create the component.

Component specification:

- The component should be composed of the avatar, label text, a close button
- the component should be rounded
- the background should be gray-200
- the text should be small (.875 rem)
- there should be .5rem of horizontal padding around label
- the label text (and all composed parts) should be vertically center


<details><summary>Answer</summary><p>

```
git checkout 2d-answer
```

```
chip.component.html

<div class="chip-wrapper">
  <app-avatar [label]="firstLetters"></app-avatar>
  <div class="chip-label">{{label}}</div>
  <app-svg-button name="times" (click)="onClose()"></app-svg-button>
</div>

chip.component.scss

.chip-wrapper {
  @apply inline-flex rounded-full items-center bg-gray-200;
}

.chip-label {
  @apply text-gray-700 text-sm px-2;
}

```

</p></details>


### Exercise 3 - creating reusable input styles

####3a. Create basic input styling

**Do your works in the styles.scss

Desired result:

![](input.png)

```
git checkout 3a-start
```

Component specification:

- text should be .875rem and gray-900
- border should be gray-300 and rounded
- there should be .5rem of vertical padding
- there should be .75rem of horizontal padding
- the final product should be 35 px in height
- the default 'outline' should be removed (when you focus the input)

** If your input has more height than expected it could be the line height. Line height is the amount of vertical space that text takes up. For example, if you have a multiline paragraph, the line-height will dictate how much space is between each line. Having good spacing between lines of text affects readability and can make or break how your paragraphs look. Tailwind has a default line height of 1.5rem which is not desired in this situation. Can you figure out how to control this using tailwind utility classes?

<details><summary>Answer</summary><p>

```
git checkout 3a-answer
```

```
styles.scss

.input {
  @apply px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded outline-none leading-none;
  ...existing styles...
}
```
</p></details>

####3b. create focus styling

Desired result:

![](input-focus.png)

```
git checkout 3b-start
```

Component specification (when focused):

- the border should transition to blue-300 over 200ms
- an additional 3px semi-transparent blue 'border' should be added to make the input glow

** Did you know outset box shadow is rendered outside the element? Box shadow doesn't take up any space, but rather cuts into the existing space which ensures that the height of your element doesn't change, which would cause elements on your page to move.

<details><summary>Hint</summary><p>

```
box-shadow: 0px 0px 0px 3px rgba(66, 153, 225, 0.35);
```
</p></details>

<details><summary>Answer</summary><p>

```
git checkout 3b-answer
```

```
styles.scss

.input {
  ...existing styles...
  transition: all 200ms ease-in-out;
}

.shadow-focus {
  box-shadow: 0px 0px 0px 3px rgba(66, 153, 225, 0.35);
}

.input:focus {
  @apply shadow-focus border-blue-300;
}

```
</p></details>


####3c. create disabled styling

Component specification (when disabled):

- the background should be gray-100
- the text should be gray-500

<details><summary>Answer</summary><p>

```
git checkout 3b-answer
```

```
styles.scss

.input[disabled] {
  @apply bg-gray-100 text-gray-500;
}
```
</p></details>


####3d. create error styling

Component specification (when error attribute exists):

- the border should transition be red-300
- an additional 3px semi-transparent red 'border' should be added to make the input glow

** note remember from the last example how to use css attribute selectors

<details><summary>Hint</summary><p>

```
box-shadow: 0px 0px 0px 3px rgba(245, 101, 101, 0.35);
```
</p></details>


<details><summary>Answer</summary><p>

```
git checkout 3d-answer
```

```
styles.scss

.shadow-error {
  box-shadow: 0px 0px 0px 3px rgba(245, 101, 101, 0.35);
}

.input[error] {
  @apply shadow-error border-red-300;
}
```
</p></details>


### Exercise 4 - build the drawing

In exercise 2 we built reusable angular components. In this exercise the goal is to produce an image using html and css, not make a component functional or for reuse. So go ahead and hardcode text, paste an svg right into the html, or set a style on an html element. You'll to use tailwind classes directly in the html rather than externalizing them into an scss file. If you're spending time thinking about what html tag to use make it a div. The answers use div tags exclusively.


####4a. Create an alert component

```
ng g c alert
```

** requirement: the max-width of the alert should be 20rem

```
style="max-width: 20rem"
```


![](alert.png)

<details><summary>Answer</summary><p>

```
git checkout 4a-answer
```

```
<div class="p-4 rounded bg-white border-t-4 border-blue-900 shadow-xl inline-block" style="max-width: 20rem">
  <div class="flex items-center">
    <div class="rounded-full h-10 w-10 bg-blue-900 flex-shrink-0 flex items-center justify-center">
      <div class="text-white h-4 w-4 mb-1">
        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="bell"
             class="svg-inline--fa fa-bell fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path fill="currentColor"
                d="M439.39 362.29c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71zM67.53 368c21.22-27.97 44.42-74.33 44.53-159.42 0-.2-.06-.38-.06-.58 0-61.86 50.14-112 112-112s112 50.14 112 112c0 .2-.06.38-.06.58.11 85.1 23.31 131.46 44.53 159.42H67.53zM224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64z"></path>
        </svg>
      </div>
    </div>
    <div class="ml-4">
      <div class="text-gray-900 font-semibold text-sm">
        Important information
      </div>
      <div class="text-gray-500 text-xs mt-1">
        Make sure you read this information before you continue.
      </div>
    </div>
  </div>
</div>
```
</p></details>


####4b. Create a home screen

```
ng g c home-screen
```

![](home-screen.png)

** guidance:
- The top section has larger text with additional font weight
    - [tailwind font size](https://tailwindcss.com/docs/font-size)
    - [tailwind font weight](https://tailwindcss.com/docs/font-weight)

- the bottom section has a z-index and negative margin to pull it into the top section
    - [tailwind z-index](https://tailwindcss.com/docs/z-index)

- the circles are absolute positioned and semi-transparent (opacity). When using absolute positioning, make sure you're positioning within a relative container.
    - [tailwind position](https://tailwindcss.com/docs/position)
    - [tailwind top, left, right, bottom...](https://tailwindcss.com/docs/top-right-bottom-left)
    - [tailwind opacity](https://tailwindcss.com/docs/opacity)


<details><summary>Answer</summary><p>

```
git checkout 4b-answer
```

```
<div class="rounded-2xl bg-blue-900 p-6 w-96 overflow-hidden">
  <div class="relative w-full">
    <div class="bg-blue-500 rounded-full h-60 w-60 absolute top-0 right-0 opacity-50"
         style="margin-top: -4rem; margin-right: -4rem">
    </div>
    <div class="bg-blue-500 rounded-full h-10 w-10 absolute top-0 left-0 opacity-50"
         style="margin-top: 9rem; margin-left: 7rem">
    </div>
  </div>
  <div
    class="text-xs font-medium leading-none rounded-full inline-flex items-center px-2 py-1 bg-gray-200 text-gray-800">
    BETA
  </div>
  <div class="mt-36 text-blue-300 text-xs">
    HOME
  </div>
  <div class="text-4xl font-medium text-gray-200">
    Goodmorning,
  </div>
  <div class="text-4xl font-medium text-gray-200">
    Jim
  </div>
  <div class="bg-blue-500 opacity-50 text-gray-200 text-xs rounded-full w-full px-3 py-3 leading-none mt-4 mb-12">
    Search
  </div>
</div>

<div class="rounded-2xl w-96 p-4 bg-white text-gray-900 shadow-lg z-10" style="margin-top: -2rem;">

  <div class="flex items-center mb-4">
    Messages
    <div class="ml-2 px-2 rounded-full text-xs bg-blue-200 text-blue-900 font-medium">
      5
    </div>
  </div>

  <div class="bg-gray-100 rounded-lg px-2 py-3">
    <div class="flex items-center">
      <div class="p-2 bg-blue-500 rounded-lg w-12 h-12 flex-shrink-0">
      </div>
      <div class="w-full flex justify-between">
        <div class="px-3">
          <div class="text-sm">Jim Bean</div>
          <div class="text-xs text-gray-500">this is a message</div>
        </div>
        <div class="text-xs">8:44 am</div>
      </div>
    </div>
  </div>

  <div class="px-2 py-3">
    <div class="flex items-center">
      <div class="p-2 bg-blue-200 rounded-lg w-12 h-12 flex-shrink-0">
      </div>
      <div class="w-full flex justify-between">
        <div class="px-3">
          <div class="text-sm">Jane Bean</div>
          <div class="text-xs text-gray-500">this is another message message</div>
        </div>
        <div class="text-xs">2 days ago</div>
      </div>
    </div>
  </div>

  <div class="px-2 py-3">
    <div class="flex items-center">
      <div class="p-2 bg-blue-800 rounded-lg w-12 h-12 flex-shrink-0">
      </div>
      <div class="w-full flex justify-between">
        <div class="px-3">
          <div class="text-sm">Joe Pinto</div>
          <div class="text-xs text-gray-500">this is another message message</div>
        </div>
        <div class="text-xs">2 days ago</div>
      </div>
    </div>
  </div>
</div>
```
</p></details>
