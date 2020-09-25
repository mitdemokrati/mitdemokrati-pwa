import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectInstallPrompt } from '../../ducks/shared/sharedSelectors';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { InstallButton } from '../../components/button/installButton';
import { isMobile } from '../../utility/environment';

import './menu.less';

const MenuContent = (): JSX.Element => {
  const installPrompt = useSelector(selectInstallPrompt);

  return (
    <>
      {installPrompt ? (
        <li>
          <InstallButton />
        </li>
      ) : null}

      <li>
        <a href="/about/">Om{'\n'}MitDemokrati</a>
      </li>
    </>
  );
};

type MobileMenuProps = {
  parentRef: React.Ref<HTMLElement>;
};
const MobileMenu = ({ parentRef }: MobileMenuProps): JSX.Element => {
  const [expanded, setExpanded] = useState(false);

  if (!expanded) {
    return (
      <button type="button" onClick={() => setExpanded(true)}>
        {'\u2630'}
      </button>
    );
  }

  useOutsideClick(parentRef, () => {
    setExpanded(false);
  });

  return (
    <>
      <button type="button" onClick={() => setExpanded(false)}>
        {'\u2715'}
      </button>

      <ul>
        <MenuContent />
      </ul>
    </>
  );
};

const DesktopMenu = (): JSX.Element => (
  <ul>
    <MenuContent />
  </ul>
);

export const Menu = (): JSX.Element => {
  const ref = useRef<HTMLElement>();

  return (
    <nav className="menu" ref={ref}>
      {isMobile() ? <MobileMenu parentRef={ref} /> : <DesktopMenu />}
    </nav>
  );
};
