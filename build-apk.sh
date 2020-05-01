#!/bin/bash

ionic build
npx cap copy android
cd ./android/ && ./gradlew assembleDebug && cd ..