# Angular 101

a project to get familiar with Angular fundamentals

- references
  - [official doc](https://angular.io/tutorial)
- data binding(2 ways), event binding, attribute binding
- pass data between components
  - parent     -> child
  - child      -> parent
  - relative 1 -> relative 2
- routing
- http service
  - `import { HttpClient, HttpHeaders } from '@angular/common/http';`

## todo

- [ ] data visualization  
  - [ ] bar chart  
  - [ ] pi chart

## basic

- `ng serve` run in dev mode
  - `ng serve --open` run and open default browser

## is it true, error fix, bug fix

- there can not be 2 root elements in component html file?

## how to create an simple angular project

```sh
# [how to setup](https://angular.io/guide/setup-local)

# prerequisite - node.js and npm
node -v  # check version
npm -v   # check version

# create a workspace and init app
npm install -g @angular/cli # install angular cli, only need do once
cd /e/Dev/VSCode            # enter a folder
ng new angular102           # create an app 'angular102', may take minutes, press enter to use defaults when prompt

# run
cd angular102      # enter the app src folder
ng serve --open    # run and open default browser

```

---

## Flowing is auto generated ----------------------------------------------------------------------

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
