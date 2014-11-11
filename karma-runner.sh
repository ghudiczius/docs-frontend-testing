#!/bin/bash
export KARMA_BIN=karma

usage() {
	echo "Usage: karma.bat {install|run|start}"
	echo "Parameters:"
	echo "  install: installs karma runner and package prerequisites"
	echo "  run: executes test specs once and generates coverage report"
	echo "  start: starts karma and watches files for changes. if any of the watched files change executes test specs"
}

install() {
	echo "Installing Karma..."
	npm install
	npm install -g karma-cli
}

run() {
	echo "Running Karma..."
	$KARMA_BIN start conf/karma.conf.ci.js
}

start() {
	echo "Starting Karma..."
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
