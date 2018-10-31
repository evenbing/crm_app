rm -rf output
mkdir output
cd output
mkdir android
mkdir ios
cd ../
react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output output/android/index.android.bundle --assets-dest output/android && react-native bundle --platform ios --dev false --entry-file index.ios.js --bundle-output output/ios/index.ios.bundle --assets-dest output/ios
