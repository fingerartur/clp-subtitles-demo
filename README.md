# Castlabs PRESTOplay subtitles demo

Demo of styled subtitles with @castlabs/prestoplay@6.2.8.

## Get started
Install and run:
```sh
yarn install
yarn start
```


## Debugging stylesheets
To find all PRESTOplay stylesheets run the following command in the DevTools console.
It will return all PRESTOplay stylesheets with the index of their `<style>` element
in the DOM and their CSS rules.

```js
Array.from(document.getElementsByTagName('style'))
  .map((style, index) => ({ index, rules: Array.from(style.sheet.rules) }))
  .filter(item => item.rules.some(rule => rule.selectorText.startsWith('.clpp-')))
```
