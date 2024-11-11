import xml.etree.ElementTree as ET

def add_minimum_version(file_path):
    tree = ET.parse(file_path)
    root = tree.getroot()
    
    dict_elem = root.find('dict')
    if dict_elem is not None:
        keys = dict_elem.findall('key')
        if not any(key.text == 'MinimumOSVersion' for key in keys):
            key = ET.SubElement(dict_elem, 'key')
            key.text = 'MinimumOSVersion'
            value = ET.SubElement(dict_elem, 'string')
            value.text = '14.0'
            
            tree.write(file_path, encoding='UTF-8', xml_declaration=True)
            print(f"Added MinimumOSVersion to {file_path}")
        else:
            print(f"MinimumOSVersion already exists in {file_path}")

# 실제 파일 경로 지정
files = [
    'ios/Pods/hermes-engine/destroot/Library/Frameworks/universal/hermes.xcframework/ios-arm64/hermes.framework/Info.plist',
    'ios/Pods/hermes-engine/destroot/Library/Frameworks/universal/hermes.xcframework/xros-arm64/hermes.framework/Info.plist'
]

for file in files:
    try:
        add_minimum_version(file)
    except Exception as e:
        print(f"Error processing {file}: {e}")