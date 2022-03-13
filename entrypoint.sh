while getopts ":a:" opt; do
  case $opt in
    a)
        if [ $OPTARG == 'dev' ]; then
        DIR="$PWD""/android"
        echo "Installing config files in ${DIR}..."
        if [[  -d "$DIR" ]]; then
          # Take action if $DIR exists. #
          echo "Directory exists ${DIR}..."
          NPM install -g cordova-res --unsafe-perm
          NPM run build:dev --fix
          ionic capacitor sync android --no-build
          CP google-services.json android/
          CP google-services.json android/app/
          CP MainActivity.java android/app/src/main/java/ar/com/siwca/coope/cooperativas/isma/
          cordova-res android --skip-config --copy
          sudo chmod -R 777 .
          chmod 777 *
          chmod 777 */*
          chmod 777 */*/*
          chmod 777 android/*
          chmod 777 ./android/*/*
          chmod 777 ./android/*/*/*
          chmod 777 ./android/*/*/*/*
          npx cap open android
        fi
        if [[ ! -d "$DIR" ]]; then
          echo "Directory not exists ${DIR}..."
          RM -rf android
          NPM install -g cordova-res --unsafe-perm
          NPM run build:dev --fix
          ionic capacitor add android  --no-build
          CP google-services.json android/
          CP google-services.json android/app/
          CP MainActivity.java android/app/src/main/java/ar/com/siwca/coope/cooperativas/isma/
          cordova-res android --skip-config --copy
          chmod 777 *
          chmod 777 */*
          chmod 777 */*/*
          chmod 777 android/*
          chmod 777 ./android/*/*
          chmod 777 ./android/*/*/*
          chmod 777 ./android/*/*/*/*
          npx cap open android
        fi
        fi
        if [ $OPTARG == 'prod' ]; then
        DIR="$PWD""/android"
        if [[  -d "$DIR" ]]; then
          # Take action if $DIR exists. #
          echo "Directory exists ${DIR}..."
          NPM install -g cordova-res --unsafe-perm
          NPM run build:prod --fix
          ionic capacitor sync android  --no-build
          CP google-services.json android/
          CP google-services.json android/app/
          CP MainActivity.java android/app/src/main/java/ar/com/siwca/coope/cooperativas/isma/
          cordova-res android --skip-config --copy
          chmod 777 *
          chmod 777 */*
          chmod 777 */*/*
          chmod 777 android/*
          chmod 777 ./android/*/*
          chmod 777 ./android/*/*/*
          chmod 777 ./android/*/*/*/*
          npx cap open android
        fi
        if [[ ! -d "$DIR" ]]; then
          echo "Directory not exists ${DIR}..."
          RM -rf android
          NPM install -g cordova-res --unsafe-perm
          NPM run build:prod --fix
          ionic capacitor add android  --no-build
          CP google-services.json android/
          CP google-services.json android/app/
          CP MainActivity.java android/app/src/main/java/ar/com/siwca/coope/cooperativas/isma/
          cordova-res android --skip-config --copy
          chmod 777 *
          chmod 777 */*
          chmod 777 */*/*
          chmod 777 android/*
          chmod 777 ./android/*/*
          chmod 777 ./android/*/*/*
          chmod 777 ./android/*/*/*/*
          npx cap open android
        fi
        fi
        echo "-a was triggered, Parameter: $OPTARG" >&2
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
    :)
      echo "Option -$OPTARG requires an argument." >&2
      exit 1
      ;;
  esac
done
