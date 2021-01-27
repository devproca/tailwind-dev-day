## Using angular 11 and tailwind

```
npm uninstall -g @angular/cli
npm cache clean
npm install -g @angular/cli@^11
```

## Setting up an angular application configured to use tailwindcss

Skip the install because we will use yarn instead of npm

```
ng new --skip-install angular-tailwind
cd angular-tailwind
yarn install
```

### Add some additional dependencies and configure

```
yarn add @angular-builders/custom-webpack
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

Generate the tailwind config

```
npx tailwind init
```

Configure the purge option in the newly generated tailwind.config.js. This will configure tailwind to eliminiate any unused utility classes in the build process.

**Note: When your application is built without the purge option, your styles will be approximately 3MB. With this configuration you won't want to have purge on for local development because your styles won't reload correctly.

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
