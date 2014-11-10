@echo off
set KARMA_BIN=karma

if "%1" == "install" goto install
if "%1" == "start" goto start
if "%1" == "run" goto run

:usage
echo "Usage: karma.bat {install^|run^|start^}"
echo "Requires Node.js [nodejs.org]"
echo "Parameters:"
echo "  install: installs required modules"
echo "  run: executes the tests once, generates coverage report"
echo "  start: starts up karma, watches files and executes tests if anything has changed"
goto end

:install
echo Installing Karma...
call npm install
call npm install -g karma-cli
echo Karma has been installed.
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
