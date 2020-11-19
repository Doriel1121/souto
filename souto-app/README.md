![greadme](https://user-images.githubusercontent.com/10087174/99705315-3d830f80-2aa2-11eb-9c80-27ffe8f89479.png)

# Souto client application
This directory contains all the code of the client application. It does not work without a server. By default, in master, the server is configured to the production server in AWS. 

To change this, edit the file config.js under src directory

## Code
The code is built from web-application and Cordova project. 
The Cordova build this web-application as APK.
The web-application is the real brain of the app. To run this web-application please look at Debug section.

The web application is built with React 16.14 and Material-ui.

## Debug
First of all, after you clone this repository, run `npm install` or `yart install` from the souto-app directory. When installation is finished you can run the application with `npm start` or `yarn start`.

A chrome (or your default browser) will open up and you will likely to get the message that the device is not supported. All you need to do is open the Developer tools and click at
<img width="63" alt="Screen Shot 2020-11-20 at 1 04 59" src="https://user-images.githubusercontent.com/10087174/99734958-6ae4b300-2acc-11eb-981b-a3fb65a8dd64.png">
button so it will handle this page as in mobile device. Please refresh the page manually and you will get the web-application.

An acceptable ratio of device screen is 420x820

## Deploy
If you changed the code and want to deploy to your device, you can run `react-scripts build` and after that change the `build` directory name to `www`, and then run `cordova run android` when your device is connected and authorized

## Contribute
Please contribute to this repository, We accept all Pull-requests of all features and every cool idea you got!
