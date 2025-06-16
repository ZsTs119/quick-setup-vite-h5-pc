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
  console.log('开始生成签名...');
  const startTime = performance.now();

  // 将对象转换为字符串数组
  const stringArray = objectToStringArray(params);
  const arrayTime = performance.now();
  console.log(`对象转换耗时: ${(arrayTime - startTime).toFixed(2)}ms`);

  // 将数组按照升序排序
  stringArray.sort();
  const sortTime = performance.now();
  console.log(`数组排序耗时: ${(sortTime - arrayTime).toFixed(2)}ms`);

  // 将数组拼接为字符串
  const concatenatedString = stringArray.join('&');
  const joinTime = performance.now();
  console.log(`字符串拼接耗时: ${(joinTime - sortTime).toFixed(2)}ms`);
  console.log('请求参数字符串:', concatenatedString);

  // 进行MD5加密
  const signature = Md5.hashStr(concatenatedString);
  const endTime = performance.now();
  console.log(`MD5加密耗时: ${(endTime - joinTime).toFixed(2)}ms`);
  console.log(`总耗时: ${(endTime - startTime).toFixed(2)}ms`);
  console.log('生成的签名:', signature);

  return signature;
}

/**
 * 性能测试函数
 * @param params - 测试参数
 * @param times - 测试次数
 */
export function testSignaturePerformance(params: StringKeyObject, times: number = 100): void {
  console.log(`开始性能测试，重复 ${times} 次...`);
  const startTime = performance.now();

  for (let i = 0; i < times; i++) {
    generateSignature(params);
  }

  const endTime = performance.now();
  const avgTime = (endTime - startTime) / times;

  console.log(`性能测试结果:重复 ${times} 次`);
  console.log(`总耗时: ${(endTime - startTime).toFixed(2)}ms`);
  console.log(`平均耗时: ${avgTime.toFixed(2)}ms`);
}