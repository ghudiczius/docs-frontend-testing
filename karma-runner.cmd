@echo off
set KARMA_BIN=karma

if "%1" == "install" goto install
if "%1" == "start" goto start
if "%1" == "run" goto run

:usage
echo "Usage: karma.bat {install^|run^|start^}"
echo "Parameters:"
echo "  install: installs karma runner and package prerequisites"
echo "  run: executes test specs once and generates coverage report"
echo "  start: starts karma and watches files for changes. if any of the watched files change executes test specs"
goto end

:install
echo Installing Karma...
call npm install
call npm install -g karma-cli
goto end

:run
echo Running Karma...
call %KARMA_BIN% start conf/karma.conf.ci.js
goto end

:start
echo Starting up Karma...
call %KARMA_BIN% start conf/karma.conf.js
goto end

:end
