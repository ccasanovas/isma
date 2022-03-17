platform :ios, '12.0'
use_frameworks!

# workaround to avoid Xcode caching of Pods that requires
# Product -> Clean Build Folder after new Cordova plugins installed
# Requires CocoaPods 1.6 or newer
install! 'cocoapods', :disable_input_output_paths => true

def capacitor_pods
  pod 'Capacitor', :path => '../../node_modules/@capacitor/ios'
  pod 'CapacitorCordova', :path => '../../node_modules/@capacitor/ios'
  pod 'CapacitorCommunityFcm', :path => '..\..\node_modules\@capacitor-community\fcm'
  pod 'CapacitorApp', :path => '..\..\node_modules\@capacitor\app'
  pod 'CapacitorAppLauncher', :path => '..\..\node_modules\@capacitor\app-launcher'
  pod 'CapacitorBrowser', :path => '..\..\node_modules\@capacitor\browser'
  pod 'CapacitorCamera', :path => '..\..\node_modules\@capacitor\camera'
  pod 'CapacitorDialog', :path => '..\..\node_modules\@capacitor\dialog'
  pod 'CapacitorFilesystem', :path => '..\..\node_modules\@capacitor\filesystem'
  pod 'CapacitorHaptics', :path => '..\..\node_modules\@capacitor\haptics'
  pod 'CapacitorKeyboard', :path => '..\..\node_modules\@capacitor\keyboard'
  pod 'CapacitorNetwork', :path => '..\..\node_modules\@capacitor\network'
  pod 'CapacitorPushNotifications', :path => '..\..\node_modules\@capacitor\push-notifications'
  pod 'CapacitorShare', :path => '..\..\node_modules\@capacitor\share'
  pod 'CapacitorStatusBar', :path => '..\..\node_modules\@capacitor\status-bar'
  pod 'CordovaPlugins', :path => '../capacitor-cordova-ios-plugins'
end

target 'App' do
  capacitor_pods
  # Add your Pods here
  pod 'Firebase/Analytics'
  pod 'Firebase/Messaging'
end
