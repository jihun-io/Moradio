const fs = require('fs');
const path = require('path');

// eslint-disable-next-line no-undef
const configPath = path.join(__dirname, 'app.json');

function incrementVersion() {
  try {
    // app.json 파일 읽기
    const configContent = fs.readFileSync(configPath, 'utf8');
    
    // 현재 버전 추출
    const versionMatch = configContent.match(/version:\s*["']([^"']+)["']/);
    if (!versionMatch) {
      console.error('버전 정보를 찾을 수 없습니다.');
      process.exit(1);
    }
    
    const currentVersion = versionMatch[1];
    console.log(`현재 버전: ${currentVersion}`);
    
    // 버전 파싱 및 증가
    const versionParts = currentVersion.split('.');
    if (versionParts.length !== 3) {
      console.error('버전 형식이 올바르지 않습니다. x.y.z 형식이어야 합니다.');
      process.exit(1);
    }
    
    // 마지막 숫자를 1 증가
    const lastNumber = parseInt(versionParts[2], 10);
    if (isNaN(lastNumber)) {
      console.error('버전의 마지막 부분이 숫자가 아닙니다.');
      process.exit(1);
    }
    
    versionParts[2] = (lastNumber + 1).toString();
    const newVersion = versionParts.join('.');
    
    console.log(`새 버전: ${newVersion}`);
    
    // 안드로이드 버전 코드 추출 및 증가
    const versionCodeMatch = configContent.match(/versionCode:\s*(\d+)/);
    let newConfigContent = configContent;
    
    if (versionCodeMatch) {
      const currentVersionCode = parseInt(versionCodeMatch[1], 10);
      const newVersionCode = currentVersionCode + 1;
      
      console.log(`현재 안드로이드 버전 코드: ${currentVersionCode}`);
      console.log(`새 안드로이드 버전 코드: ${newVersionCode}`);
      
      // 버전 코드 업데이트
      newConfigContent = newConfigContent.replace(
        /versionCode:\s*(\d+)/,
        `versionCode: ${newVersionCode}`
      );
    } else {
      console.log('안드로이드 버전 코드를 찾을 수 없습니다. 버전만 업데이트합니다.');
    }
    
    // 버전 업데이트
    newConfigContent = newConfigContent.replace(
      /version:\s*["']([^"']+)["']/,
      `version: "${newVersion}"`
    );
    
    // 파일에 쓰기
    fs.writeFileSync(configPath, newConfigContent, 'utf8');
    console.log('버전과 버전 코드가 성공적으로 업데이트되었습니다.');
    
  } catch (error) {
    console.error('버전 업데이트 중 오류가 발생했습니다:', error.message);
    process.exit(1);
  }
}

incrementVersion();
