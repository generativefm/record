import React from 'react';
import { Help, Info } from '@material-ui/icons';
import {
  ContextMenuOption,
  contextMenuOptionStyles,
} from '@generative.fm/web-ui';

const HELP_URL =
  'https://www.notion.so/generativefm/Get-help-with-Generative-fm-0efd0280b87d4132a66d212f125d9f4f';

const ContextMenu = () => {
  return (
    <>
      <ContextMenuOption href={HELP_URL}>
        <Help
          className={contextMenuOptionStyles['context-menu-option__icon']}
        />
        Help
      </ContextMenuOption>
      <ContextMenuOption linkTo="/about">
        <Info
          className={contextMenuOptionStyles['context-menu-option__icon']}
        />
        About
      </ContextMenuOption>
    </>
  );
};

export default ContextMenu;
