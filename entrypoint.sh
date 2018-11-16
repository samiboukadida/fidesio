#!/bin/bash

cp  -p -r /usr/src/cache/node_modules/* /usr/src/app/node_modules/

# add `/usr/src/app/node_modules/.bin` to $PATH
# export  PATH=/usr/src/app/node_modules/.bin:$PATH
exec npm start
