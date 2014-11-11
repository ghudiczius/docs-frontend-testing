# frontend-testing #

Unit testing frontend applications with jasmine, squirejs and karma.

* [Prerequisites](#prerequisites "jump to prerequisites")
* [Installation](#installation "jump to installation information")
* [Usage](#usage "jump to usage information")
* [Version](#version "jump to version information")

## Prerequisites ##

* [nodejs](http://nodejs.org/ "download nodejs")

## Installation ##

* Download and install nodejs.
* Run `karma-runner.{cmd|sh} install` to install karma-runner and the required node modules.

## Usage ##

* Run `karma-runner.{cmd|sh} run` to run the specs one and to generate coverage report. Coverage reports can be found under the *coverage* directory.
* Run `karma-runner.{cmd|sh} run` to start karma and watch for changes. If any of the watched files change the specs are run.

## Version ##

### 0.0.2 ###

* * Added modules to test the visibility of callback functions in tests on angular directives
* - 2014. 11. 10.

### 0.0.1 ###

* * Initial version
* - 2014. 11. 11.

### Legend ###

* * New feature 
* + Minor update 
* x Bugfix 
* - Information
