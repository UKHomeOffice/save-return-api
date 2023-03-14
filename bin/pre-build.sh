#!/bin/bash

echo "Pre-Build Started"
echo "Additional Schema: $ADDITIONAL_SCHEMA"
if [ -z "$ADDITIONAL_SCHEMA" ]
then
  echo "No Additional Schemas Configured"
else
  echo "Installing Additional Schema"
  npm install $ADDITIONAL_SCHEMA
fi
echo "Pre-Build Finished"