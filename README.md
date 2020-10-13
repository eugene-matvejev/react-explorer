[ci.tests-master-badge]: https://circleci.com/gh/eugene-matvejev/react-explorer/tree/master.svg?style=svg
[ci.tests-master]: https://circleci.com/gh/eugene-matvejev/react-explorer/tree/master
[ci.coverage-master-badge]: https://codecov.io/gh/eugene-matvejev/react-explorer/branch/master/graph/badge.svg
[ci.coverage-master]: https://codecov.io/gh/eugene-matvejev/react-explorer/branch/master

[ci.tests-heroku-badge]: https://circleci.com/gh/eugene-matvejev/react-explorer/tree/heroku.svg?style=svg
[ci.tests-heroku]: https://circleci.com/gh/eugene-matvejev/react-explorer/tree/heroku
[ci.coverage-heroku-badge]: https://codecov.io/gh/eugene-matvejev/react-explorer/branch/heroku/graph/badge.svg
[ci.coverage-heroku]: https://codecov.io/gh/eugene-matvejev/react-explorer/branch/heroku

|               | master                                                        | heroku
|---            |---                                                            | ---
| __tests__     | [![tests][ci.tests-master-badge]][ci.tests-master]            | [![tests][ci.tests-heroku-badge]][ci.tests-heroku]
| __coverage__  | [![coverage][ci.coverage-master-badge]][ci.coverage-master]   | [![coverage][ci.coverage-heroku-badge]][ci.coverage-heroku]

##### THIS IS A SPARE TIME PROJECT, WORK IN PROGRESS! [DEMO](https://cwa-explorer.herokuapp.com)

# 'Explorer' front-end

back-end can be found [here](https://github.com/eugene-matvejev/node-explorer)

### software requirements

if you're using `make` commands, __[docker](https://docs.docker.com/install/)__ and __[docker-compose](https://docs.docker.com/compose/install/)__ are required, and local __[node.js](https://nodejs.org/)__ with __[npm](https://www.npmjs.com/)__ are optional
* [node.js](https://nodejs.org/) v10+
* [npm](https://www.npmjs.com/) v6+ or [yarn](https://yarnpkg.com/)
* __optional__ [makefile](https://en.wikipedia.org/wiki/Makefile) comes out of the box in *unix* enviroments
* __optional__ [docker](https://www.docker.com/) v18.09+
* __optional__ [docker-compose](https://docs.docker.com/compose/) v3+ *for 'cypress' tests only*

### used technologies

* [react.js](https://reactjs.org/)
* [sass](https://sass-lang.com/)
* [jest](https://facebook.github.io/jest/)
* [enzyme](http://airbnb.io/enzyme/)
* [react testing library](https://testing-library.com/docs/react-testing-library/intro)
* [cypress](https://www.cypress.io/)

### used services

* [circle ci](https://circleci.com/dashboard)
* [codecov](https://codecov.io/)
* [code climate](https://codeclimate.com/)
* [snyk](https://snyk.io/)
* [heroku](https://www.heroku.com/)

### how to install

* with `make` commands no steps additional required, otherwise you need execute `$ npm i`

### how to run tests

* end to end 'cypress' tests: `$ make sync` to fetch GraphQL backend as git submodule, then `$ make cypress`
  * _npm analogue_ require booting up [CWA](https://github.com/eugene-matvejev/react-explorer) & [SA](https://github.com/eugene-matvejev/node-explorer/) and link them together, then `cd cypress && npm test`
* functional 'jest' tests: `$ make test` or `$ npm test`
  * __optional__ [ 'jest' CLI params](https://facebook.github.io/jest/docs/en/cli.html), examples:
    * to collect coverage, example: `$ npm test -- --coverage`, report will be located in __./coverage__ directory
    * to run tests __only__ in specific file, example: `$ npm test src/validation/rules.test.js`

### how to run in 'development' mode

* `$ make` or `$ npm start`

### how to run in 'production' mode

* `$ make serve`, there is no *npm* equivalent
* if you __only__ need to generate static assets
  * `$ make build` or `$ npm run build` - generated assets will be located in __./build__ directory

### how to run containers with different variables using 'make'

* example: `make PORT=18080`

### gitflow

* *heroku* -> current __production__, contains *heroku specific changes*, trigger deploy on heroku on *every push*
* *master* -> most upto date __production ready__, all pull requests in to this branch got mandatory checks 'ci/circleci: jest' and 'ci/circleci: cypress'
* *feature branches* -> get merged into master branch, when they ready and mandatory checks passed
* *CI execute tests in isolated enviroment*

### used environment variables

| variable          | default value     | used as   | purpose
|---                |---                |---        |---
| PORT              | 8080              | number    | port on which application will be made available
| REACT_APP_GRAPHQL | //localhost:8081  | string    | GraphQL backend URI
| REACT_APP_TITLE   | EXAMPLE           | string    | website's title
