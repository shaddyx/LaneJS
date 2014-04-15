#!/bin/bash

url=index.html

[[ -x $BROWSER ]] && exec "$BROWSER" "$url"
path=$(which xdg-open || which gnome-open) && exec "$path" "$url"
echo "Can't find browser!"
