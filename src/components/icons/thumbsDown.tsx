import React from 'react';

import { Thumb } from './thumbs';
import './thumbs.less';

type ThumbsDownProps = {
  size: number;
};
export const ThumbsDown = ({ size }: ThumbsDownProps): JSX.Element => (
  <Thumb className="thumbs--down color" size={size} />
);
