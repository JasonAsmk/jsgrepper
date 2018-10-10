#!/usr/bin/env bash

function searchWithRegex() {
  RESULT=`cat $1 | "$GREPPER" "$REGEX"`
  if [ -n "$RESULT" ]; then
    echo $'\n\n-----------------------------------------------------------------------'
    echo "$1"
    echo $'\n'
    echo "$RESULT"
  fi
}

function searchDirectory() {
  for name in "$1"/*; do
    [ -e "$name" ] || continue
    if [ -d "$name" ]; then
      searchDirectory "$name"
    elif [[ -n "$FILENAME_REGEX" ]] && [[ ! $name =~ $FILENAME_REGEX ]]; then
      continue
    elif [ -f "$name" ]; then
      searchWithRegex "$name"
    fi
  done
}

if [ $# -lt 3 ] || [ $# -gt 4 ]; then
  echo "Syntax: grep-files <DIRECTORY> <GREPPER> <REGEX> (<FILENAME_REGEX>)"
elif [ ! -d $1 ]; then
  echo "Exit: $1 is not a directory"
elif [ ! -x "$(command -v $2)" ]; then
  echo "Exit: $2 not callable. Is it in path?"
else
  DIRECTORY=$1
  GREPPER=$2
  REGEX=$3
  FILENAME_REGEX=$4
  echo "Regex is $REGEX"
  searchDirectory $DIRECTORY
fi

