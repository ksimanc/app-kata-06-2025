#!/bin/bash

OS=$(uname)

if [ "$OS" = "Linux" ]; then
  set -eux
  rm -f ~/.npmrc 2>/dev/null
  curl -u "${ARTIFACTORY_READER_USER}:${ARTIFACTORY_READER_API_KEY}" 'https://bbogdigital.jfrog.io/bbogdigital/api/npm/auth' >>~/.npmrc
  # or replace ARTIFACTORY_READER_API_KEY by ARTIFACTORY_READER_PASSWORD if not exist
  sed -i 's#_auth#//bbogdigital.jfrog.io/bbogdigital/api/npm/npm-bbta/:_auth#g' ~/.npmrc
  sed -i 's#always-auth#//bbogdigital.jfrog.io/bbogdigital/api/npm/npm-bbta/:always-auth#g' ~/.npmrc
  sed -i 's#email#//bbogdigital.jfrog.io/bbogdigital/api/npm/npm-bbta/:email#g' ~/.npmrc
  npm i
  
  # Verify critical @npm-bbta packages are installed
  if [ ! -d "node_modules/@npm-bbta/sdk-ae-frontend-utils-logs-lib" ]; then
    echo "Missing @npm-bbta/sdk-ae-frontend-utils-logs-lib, attempting to install..."
    npm install @npm-bbta/sdk-ae-frontend-utils-logs-lib@^2.1.0-beta || exit 1
  fi
  
  if [ ! -d "node_modules/@npm-bbta/bbog-dig-dt-sherpa-lib" ]; then
    echo "Missing @npm-bbta/bbog-dig-dt-sherpa-lib, attempting to install..."
    npm install @npm-bbta/bbog-dig-dt-sherpa-lib@^6.2.2 || exit 1
  fi
elif [ "$OS" = "Darwin" ]; then
  set +u
  rm -f ~/.npmrc 2>/dev/null
  curl -u "${ARTIFACTORY_READER_USER}:${ARTIFACTORY_READER_API_KEY}" 'https://bbogdigital.jfrog.io/bbogdigital/api/npm/auth' >>~/.npmrc
  # # or replace ARTIFACTORY_READER_API_KEY by ARTIFACTORY_READER_PASSWORD if not exist
  sed -i "" 's#_auth#//bbogdigital.jfrog.io/bbogdigital/api/npm/npm-bbta/:_auth#g' ~/.npmrc
  sed -i "" 's#always-auth#//bbogdigital.jfrog.io/bbogdigital/api/npm/npm-bbta/:always-auth#g' ~/.npmrc
  sed -i "" 's#email#//bbogdigital.jfrog.io/bbogdigital/api/npm/npm-bbta/:email#g' ~/.npmrc
  npm i
  # or npm install
else
  echo "Sistema operativo no soportado"
  exit 1
fi
