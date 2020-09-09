import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  CastUserStemmeAction,
  UncastUserStemmeAction,
} from '../../ducks/user/userActions';
import { selectUserStemmeMap } from '../../ducks/user/userSelectors';

import './userStemme.less';
import { ThumbsUp } from '../icons/thumbsUp';
import { ThumbsDown } from '../icons/thumbsDown';
import { getStemmeTypeString } from '../../utility/stemmeType';
import { Hand } from '../icons/hand';

type UserStemmeProps = {
  afstemningId: number;
};
export const UserStemme = ({ afstemningId }: UserStemmeProps) => {
  const userStemmeMap = useSelector(selectUserStemmeMap);
  const dispatch = useDispatch();

  const userStemme = userStemmeMap.get(afstemningId) as StemmeType;
  const userHasVotedTitle = userStemme
    ? `Du stemmer ${getStemmeTypeString(userStemme)}`
    : 'Hvad stemmer du?';

  const castUserStemme = (typeId: StemmeType) => () => {
    if (typeId === userStemme) {
      dispatch(UncastUserStemmeAction(afstemningId));
      return;
    }

    dispatch(CastUserStemmeAction(afstemningId, typeId));
  };

  const buttonClassNameList = ['', '', '', ''];

  if (userStemme && userStemme > 0) {
    buttonClassNameList[userStemme] = 'selected';
  }

  return (
    <div className="user-stemme">
      <p>
        <b>{userHasVotedTitle}</b>
      </p>

      <div className="user-stemme--selector">
        <button
          onClick={castUserStemme(1)}
          type="button"
          className={buttonClassNameList[1]}
        >
          <div className="icon">
            <ThumbsUp size={40} />
          </div>
        </button>

        <button
          onClick={castUserStemme(3)}
          type="button"
          className={buttonClassNameList[3]}
        >
          <div className="icon">
            <Hand className="color" size={40} />
          </div>
        </button>

        <button
          onClick={castUserStemme(2)}
          type="button"
          className={buttonClassNameList[2]}
        >
          <div className="icon">
            <ThumbsDown size={40} />
          </div>
        </button>
      </div>
    </div>
  );
};
