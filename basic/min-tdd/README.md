# min-test

## Refs

  * https://groundberry.github.io/development/2016/12/10/testing-express-with-mocha-and-chai.html
  * [BDD/TDD development from scratch with node.js/express](https://www.robotlovesyou.com/bdd-tdd/)
  * https://blog.risingstack.com/getting-node-js-testing-and-tdd-right-node-js-at-scale/

## Install

  * yarn add express --save
  * yarn add mocha --dev (or global add)
  * yarn add chai chai-http --dev
  * Visual Studio Code
    - install mocha-sidebar

## TDD

Forming ideas
  * prototypes, spikes
  * no tests

Behavior first, TDD
  * outside in
  * requirements in comments first
  * failing test first
  * no production code before testing code

But here
  * don't test routes
  * in general, do not test implementaton details
    - black-box
    - so that tests not changed alot whenever implementation
      change
  * test behavior outside in
    - check if http requests ok
    - check json response if rest/ajax end point
    - check client code in http response with jsdom
  * unit testing core
    - models and business logic
    - move logic out of routes/controller






