# min-jsdome

Minimal client-side js testing

## Refs

  * https://www.stevefenton.co.uk/2013/05/My-Unit-Testing-Epiphany/
  * [Unit test your client-side JavaScript](http://krasimirtsonev.com/blog/article/unit-test-your-client-side-javascript-jsdom-nodejs)

Install

  * yarn add chai jsdom --dev
  * Visual Studio Code
    - install mocha-sidebar

plain-text.js

  * for simplicity, use global namespace PlainText
    - but for chai and jsdom to work, still use node commonjs require in testing
    - so PlainText add a quick last clause to expose via module

  * also test some variants of 'class' definition
    - constructor and closure
    - classical function as class
    - prototype

