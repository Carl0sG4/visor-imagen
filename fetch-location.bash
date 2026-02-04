#!/usr/bin/env bash

LOCATION_FILE="location-list.lst"

LOCATION_LIST="$(tr '\n' ',' < "${PWD}/${LOCATION_FILE}")"

IFS=','
for location_name in ${LOCATION_LIST}; do
    location_search="$(printf 'https://duckduckgo.com/?q=%s&ia=images&iax=images' "$(tr '[:space:]' '+' <<< "${location_name}")")"

    firefox "$location_search" 2>&1 > /dev/null
done

IFS=' '