export const getCompressionWorker = () =>
  window.Worker && new Worker('./compressionWorker.ts');

export const getDecompressionWorker = () =>
  window.Worker && new Worker('./decompressionWorker.ts');
