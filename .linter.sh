#!/bin/bash
cd /home/kavia/workspace/code-generation/trustride-24573-2a3e8ce9/trustride
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

