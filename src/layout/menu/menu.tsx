import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectInstallPrompt } from '../../ducks/shared/sharedSelectors';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { InstallButton } from '../../components/button/installButton';
import { isMobile } from '../../utility/environment';

import './menu.less';

const AboutLink = () => <a href="/about">Om{'\n'}MitDemokrati</a>;

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
        <AboutLink />
      </li>
    </>
  );
};

const MobileMenu = (): JSX.Element => {
  const [expanded, setExpanded] = useState(false);

  const ref = useRef<HTMLUListElement>();

  useOutsideClick(ref, () => {
    setExpanded(false);
  });

  const wrappedMenuContent = expanded ? (
    <>
      <button type="button" onClick={() => setExpanded(false)}>
        {'\u2715'}
      </button>

      <MenuContent />
    </>
  ) : (
    <button type="button" onClick={() => setExpanded(true)}>
      {'\u2630'}
    </button>
  );

  return (
    <ul className="menu" ref={ref}>
      {wrappedMenuContent}
    </ul>
  );
};

const DesktopMenu = (): JSX.Element => (
  <ul className="menu">
    <MenuContent />
  </ul>
);

export const Menu = (): JSX.Element => {
  return <nav>{isMobile() ? <MobileMenu /> : <DesktopMenu />}</nav>;
};
