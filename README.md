# vue chrome extension

## Install TailwindCSS

```bash
yarn add -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9 postcss-class-rename@^1 postcss-remove-selectors@^2 postcss-scss@^3
npx tailwindcss init -p
yarn add -D postcss-cli@^7 postcss-loader@^4.2.0 cross-env
```

tailwind.config.js

```js
module.exports = {
  purge: ['./src/**/*.vue'],
  darkMode: 'media',
  theme: {
    minWidth: {
      '0': '0',
      'popup': '350px',
      full: '100%'
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

App.vue

```html
<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
```
