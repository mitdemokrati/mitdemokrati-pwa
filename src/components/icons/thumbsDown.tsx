import React from 'react';

import { Thumb } from './thumbs';
import './thumbs.less';

type ThumbsDownProps = {
  size: number;
};
export const ThumbsDown = ({ size }: ThumbsDownProps) => (
  <Thumb className="thumbs--down" size={size} />
);
