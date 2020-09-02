import { decompressFromUTF16 } from 'lz-string';

onmessage = (event: MessageEvent) => {
  const { data } = event as { data: string };

  if (!data) {
    postMessage(undefined);
    return;
  }

  const decompressedValue = JSON.parse(decompressFromUTF16(data)!);

  postMessage(decompressedValue);
};
