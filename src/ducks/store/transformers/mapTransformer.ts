import { createTransform, Transform } from 'redux-persist';
import { TransformConfig } from 'redux-persist/es/createTransform';

export const getMapTransformer = (mapKeyList: Array<string>) => (
  config: TransformConfig
): Transform<
  {
    [x: string]: unknown;
  },
  {
    [x: string]: unknown;
  },
  unknown,
  unknown
> =>
  createTransform(
    (inbound: Record<string, unknown>) => {
      const result = { ...inbound };

      mapKeyList.forEach((key) => {
        if (key in inbound) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          result[key] = Array.from(inbound[key]);
        }
      });

      return result;
    },
    (outbound: Record<string, unknown>) => {
      const result = { ...outbound };

      mapKeyList.forEach((key) => {
        if (key in outbound) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          result[key] = new Map(outbound[key]);
        }
      });

      return result;
    },
    config
  );
