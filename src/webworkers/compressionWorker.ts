import { compressToUTF16 } from 'lz-string';

onmessage = (event: MessageEvent) => {
  const { data } = event as { data: string | object | [] };

  if (!data) {
    postMessage('');
    return;
  }

  const compressedValue = compressToUTF16(JSON.stringify(data));

  postMessage(compressedValue);
};
