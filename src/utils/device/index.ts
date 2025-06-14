import FingerprintJS from '@fingerprintjs/fingerprintjs';

// 初始化 FingerprintJS
const fpPromise = FingerprintJS.load();

// 获取设备指纹
export async function getClientId(): Promise<string> {
  const clientIdKey = 'clientId-seller';
  let clientId = localStorage.getItem(clientIdKey);

  if (!clientId) {
    const fp = await fpPromise;
    const result = await fp.get();
    clientId = result.visitorId;
    localStorage.setItem(clientIdKey, clientId);
  }

  return clientId;
} 