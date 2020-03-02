#!/usr/bin/env bash

# export each variable in .env
set -a
. ../web/.env
. ../web/.env.local
. .env
set +a