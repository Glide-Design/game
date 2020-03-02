#!/bin/sh
# Ensure all javascript files staged for commit pass standard code style
git diff --name-only --cached --relative | grep '\.jsx\?$' | xargs eslint src
if [ $? -ne 0 ]; then exit 1; fi

# if [[ $(git grep MYAPP_RELEASE_STORE_PASSWORD -- '*gradle.properties') ]]; then
#   echo '\033[0;31m' 'You are about to add and commit a password to the git repo';
#   exit 1;
# fi
#
# if [[ $(git grep MYAPP_RELEASE_KEY_PASSWORD -- '*gradle.properties') ]]; then
#   echo '\033[0;31m' 'You are about to add and commit a password to the git repo';
#   exit 1;
# fi
