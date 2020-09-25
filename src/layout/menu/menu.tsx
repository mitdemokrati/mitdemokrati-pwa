import React, { useRef, useState } from 'react';

import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useInterceptInstallPrompt } from '../../hooks/useInterceptInstallPrompt';

import { InstallButton } from '../../components/button/installButton';
import { isMobile } from '../../utility/environment';

import './menu.less';

type MenuProps = {
  installPrompt?: BeforeInstallPromptEvent;
};

const AboutLink = () => <a href="/about">Om os</a>;

const MenuContent = ({ installPrompt }: MenuProps): JSX.Element => (
  <>
    {installPrompt ? (
      <li>
        <InstallButton installPrompt={installPrompt} />
      </li>
    ) : null}

    <li>
      <AboutLink />
    </li>
  </>
);
const MobileMenu = ({ installPrompt }: MenuProps): JSX.Element => {
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

      <MenuContent installPrompt={installPrompt} />
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

const DesktopMenu = ({ installPrompt }: MenuProps): JSX.Element => (
  <ul className="menu">
    <MenuContent installPrompt={installPrompt} />
  </ul>
);

export const Menu = (): JSX.Element => {
  const [installPrompt, setInstallPrompt] = useState<
    BeforeInstallPromptEvent | undefined
  >(undefined);

  useInterceptInstallPrompt((event: BeforeInstallPromptEvent) => {
    setInstallPrompt(event);
  });

  return (
    <nav>
      {isMobile() ? (
        <MobileMenu installPrompt={installPrompt} />
      ) : (
        <DesktopMenu installPrompt={installPrompt} />
      )}
    </nav>
  );
};
