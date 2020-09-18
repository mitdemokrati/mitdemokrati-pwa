import { createTransform } from 'redux-persist';
import { TransformConfig } from 'redux-persist/es/createTransform';

export const getMapTransformer = (mapKeyList: Array<string>) => (
  config: TransformConfig
) =>
  createTransform(
    (inbound: object) => {
      const result = { ...inbound };

      mapKeyList.forEach((key) => {
        if (key in inbound) {
          // @ts-ignore
          result[key] = Array.from(inbound[key]);
        }
      });

      return result;
    },
    (outbound: object) => {
      const result = { ...outbound };

      mapKeyList.forEach((key) => {
        if (key in outbound) {
          // @ts-ignore
          result[key] = new Map(outbound[key]);
        }
      });

      return result;
    },
    config
  );
