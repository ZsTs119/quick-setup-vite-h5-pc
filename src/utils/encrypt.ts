import { Md5 } from 'ts-md5';

interface StringKeyObject {
  [key: string]: any;
}

/**
 * 递归地将对象的属性转换为字符串
 * @param obj - 需要转换的对象
 * @param prefix - 当前属性的前缀
 * @returns 转换后的字符串数组
 */
function objectToStringArray(obj: StringKeyObject, prefix: string = ''): string[] {
  const result: string[] = [];
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const newPrefix = prefix ? `${prefix}.${key}` : key;
      
      // 跳过 null 和 空值
      if (value === null || value === '') {
        continue;
      }
      
      if (Array.isArray(value)) {
        // 如果是数组，遍历数组元素并添加索引
        value.forEach((item, index) => {
          if (typeof item === 'object' && item !== null) {
            result.push(...objectToStringArray(item, `${newPrefix}.${index}`));
          } else {
            result.push(`${newPrefix}.${index}=${item}`);
          }
        });
      } else if (typeof value === 'object' && value !== null) {
        // 如果是对象，递归处理
        result.push(...objectToStringArray(value, newPrefix));
      } else {
        // 否则直接拼接键值对
        result.push(`${newPrefix}=${value}`);
      }
    }
  }
  
  return result;
}

/**
 * 生成签名
 * @param params - 需要签名的参数对象
 * @returns 生成的签名
 */
export function generateSignature(params: StringKeyObject): string {
  // 将对象转换为字符串数组
  const stringArray = objectToStringArray(params);
  // 将数组按照升序排序
  stringArray.sort();
  // 将数组拼接为字符串
  const concatenatedString = stringArray.join('&');
  console.log('请求的参数对象', concatenatedString);
  // 进行MD5加密并返回
  return Md5.hashStr(concatenatedString);
}