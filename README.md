<p align="center">
  <a href="https://github.com/actovos-consulting-group/baibel"><img src="./img/repo-logo.png" width="200" alt="Logo"></a>
</p>

<p align="center">
   Bible Translation App
</p>

<p align="center">
  <a href="#badge"><img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg" alt="styled with prettier"></a>
  <a href="#badge"><img src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg" alt="Conventional Commits"></a>
</p>

## Overview

Baibel provides Bible Translations and Media to remote users where there may be no wifi or internet service. The app functions completely offline and uses no external API or http requests. 

All the data is bundled statically with the app -- .mp3 audio files, and html for reading. Currently this app has only been tested and optimized for Android.

## Setup

1. Make sure you have the react-native CLI installed globally

2. then `cd` to the root of the project, and run

```
npm i
```

3. Give that some time to run, and then edit the files at `android/`... `gradle.properties` and `local.properties`  
You have to have the java SDK and JRE all set up correctly.

4. Now, you can run the following command

```
react-native run-android
```

You'll have to address any errors you get here before moving ahead.

## Compile Audio and Books

1. Create a `static` directory in the root of the project.

2. Make sure there is an empty directory called `raw` at `android/app/src/main/res`

3. Copy your listen and read files into the `static` directory made in **Step 1**. (The structure should resemble below)

<img src="./img/dir.jpg" width="200" alt="Dir">

4. Run the compilation script. `node generate-app-data.js`. If you have issues running ensure your node version is `12.15.0`. This will compile your assets into the proper directories and formats to be consumed by the app.

5. Next either *run the app for development* or *generate an apk file.*

### To Generate an APK

1. Ensure you have latest version of android studio installed.
2. cd into the `android` folder.
3. Run `./gradlew assembleRelease`. The APK will exist in the following folder.

<img src="./img/apk.png" width="200" alt="APK">
