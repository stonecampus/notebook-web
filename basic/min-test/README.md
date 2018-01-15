# min-test

Refs

  * https://groundberry.github.io/development/2016/12/10/testing-express-with-mocha-and-chai.html
  * https://www.stevefenton.co.uk/2013/05/My-Unit-Testing-Epiphany/
  * [Ian Cooper: TDD, where did it all go wrong](https://vimeo.com/68375232)

Install

  * yarn add express --save
  * yarn add mocha --dev (or global add)
  * yarn add chai chai-http --dev
  * Visual Studio Code
    - install mocha-sidebar

app.js

  * don't listen if testing
  * in testing listen and keep the server, and close after done
  * may use different ports for different tests


