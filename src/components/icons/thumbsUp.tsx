import React from 'react';

import { Thumb } from './thumbs';
import './thumbs.less';

type ThumbsUpProps = {
  size: number;
};
export const ThumbsUp = ({ size }: ThumbsUpProps): JSX.Element => (
  <Thumb className="thumbs--up color" size={size} />
);
