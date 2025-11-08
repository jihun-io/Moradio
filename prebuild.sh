#!/bin/bash

## 1. 버전 증가
#echo "Incrementing version..."
#node increment-version.js
#
## 버전 증가 성공 여부 확인
#if [ $? -ne 0 ]; then
#  echo "Version increment failed. Aborting script."
#  exit 1
#fi

# 2. npx expo prebuild 실행
echo "Running npx expo prebuild..."
npx expo prebuild

# prebuild 성공 여부 확인
if [ $? -ne 0 ]; then
  echo "npx expo prebuild failed. Aborting script."
  exit 1
fi

# 2. strings.xml 파일 수정
echo "Patching strings.xml..."
FILE_PATH="android/app/src/main/res/values/strings.xml"
OLD_STRING='<string name="app_name">moradio</string>'
NEW_STRING='<string name="app_name">Moradio</string>'

# macOS와 Linux에서 모두 호환되도록 sed 명령어 사용
sed -i.bak "s#$OLD_STRING#$NEW_STRING#g" "$FILE_PATH"
rm "${FILE_PATH}.bak"

echo "Script finished successfully."
