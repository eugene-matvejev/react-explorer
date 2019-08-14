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

# 'Explorer' react frontend

##### THIS IS SPARE TIME PROJECT, WORK IN PROGRESS! [DEMO](https://cwa-explorer.herokuapp.com)

### software requirements

if you're using `make` commands, local **node.js** and **npm** aren't required
* [node.js](https://nodejs.org/) v10+
* [npm](https://www.npmjs.com/) v6+ or [yarn](https://yarnpkg.com/)
* __optional__ [makefile](https://en.wikipedia.org/wiki/Makefile) comes out of the box in *nix enviroments
* __optional__ [docker](https://www.docker.com/) v18.09+
* __optional__ [docker-compose](https://docs.docker.com/compose/) v3+ *for 'cypress' tests only*

### used technologies

* [react.js](https://reactjs.org/)
* [sass](https://sass-lang.com/)
* [jest](https://facebook.github.io/jest/)
* [enzyme](http://airbnb.io/enzyme/)
* [cypress](https://www.cypress.io/)

### used services

* [circle ci](https://circleci.com/dashboard)
* [codecov](https://codecov.io/)
* [code climate](https://codeclimate.com/)
* [snyk](https://snyk.io/)
* [heroku](https://www.heroku.com/)

### how to install

* if you're using `make` commands and have [docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/) installed, then no steps required
* otherwise you need **node.js** installed, and execute `$ npm i`

### how to run tests

* end to end 'cypress' tests: `$ make sync` to fetch GraphQL backend as git submodule, then `$ make cypress`
  * _npm analogue_ require booting up [CWA](https://github.com/eugene-matvejev/react-explorer) & [SA](https://github.com/eugene-matvejev/node-explorer/) and link them together, then `cd cypress && npm test`
* functional 'jest' tests: `$ make test` or `$ npm test`
  * __[optional 'jest' CLI params](https://facebook.github.io/jest/docs/en/cli.html)__
    * to generate coverage report `--coverage`, example: `$ npm test -- --coverage`, report will be located in __./coverage__ directory
    * to run tests __only__ in specific file, example: `$ npm test src/validation/rules.test.js`

### how to run in 'development' mode

* `$ make` or `$ npm start`

### how to run in 'production' mode

* `$ make serve`, there is no _npm only_ analogue
  * to run on non-default port you can overwrite PORT variable, example `$ make serve PORT=18080`
* if you need __only__ generate static assets
  * `$ make build` or `$ npm run build` - generated assets will be located in __./build__ directory

### gitflow

* heroku -> current __production__, contains _heroku specific changes_, trigger deploy on heroku on every push
* master -> most upto date __production ready__
* other branches -> 'feature branches' get merged into master
CI 'jest' and 'cypress' checks are mandatory for every PR into master branch
CI execute tests in isolated enviroment per commit

### used environment variables

| variable                  | default value     | used as   | purpose
|---                        |---                |---        |---
| PORT                      | 8080              | number    | port on which application will be made available
| REACT_APP_GRAPHQL         | //localhost:8081  | string    | GraphQL backend URI
| REACT_APP_WEBSITE_NAME    | EXAMPLE           | string    | website's title in browser
