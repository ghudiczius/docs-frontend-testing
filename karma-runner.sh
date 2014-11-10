#!/bin/bash
export KARMA_BIN=karma

usage() {
	echo "Usage: karma.bat {install|run|start}"
	echo "Requires Node.js [nodejs.org]"
	echo "Parameters:"
	echo "  install: installs required modules"
	echo "  run: executes the tests once, generates coverage report"
	echo "  start: starts up karma, watches files and executes tests if anything has changed"
}

install() {
	echo "Installing Karma..."
	npm install
	npm install -g karma-cli
	echo "Karma has been installed."
}

run() {
	echo "Running Karma..."
	$KARMA_BIN start conf/karma.conf.ci.js
}

start() {
	echo "Starting up Karma..."
	$KARMA_BIN start conf/karma.conf.js
}

case $1 in
	"install")
		install
	;;
	"run")
		run
	;;
	"start")
		start
	;;
	*)
		usage
	;;
esac
