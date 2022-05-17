import React from 'react';
import { StatefulSelect as Search, TYPE } from 'baseui/select';
import {
  ALIGN, HeaderNavigation, StyledNavigationItem, StyledNavigationList,
} from 'baseui/header-navigation';
import { Avatar } from 'baseui/avatar';
import { ParagraphSmall } from 'baseui/typography';

function Header() {
  const options = {
    labelKey: 'id',
    valueKey: 'color',
    placeholder: 'Search colors',
    maxDropdownHeight: '300px',
    options: [
      { id: 'AliceBlue', color: '#F0F8FF' },
      { id: 'AntiqueWhite', color: '#FAEBD7' },
      { id: 'Aqua', color: '#00FFFF' },
      { id: 'Aquamarine', color: '#7FFFD4' },
    ],
  };

  return (
    <HeaderNavigation
      overrides={{
        Root: {
          style: ({ $theme }) => ({
            maxHeight: '70px',
            backgroundColor: $theme.colors.mono100,
            position: 'sticky',
            top: 0,
            marginLeft: '250px',
            display: 'flex',
            paddingTop: '25px',
            paddingRight: '25px',
            paddingBottom: '25px',
            paddingLeft: '25px',
            boxShadow: '0 4px 16px hsla(0, 0%, 0%, 0.05)',
            borderBottomWidth: 0,
          }),
        },
      }}
    >
      <StyledNavigationList $align={ALIGN.left}>
        <StyledNavigationItem style={{ width: '350px', paddingLeft: 0 }}>
          <Search
            {...options}
            type={TYPE.search}
            getOptionLabel={({ option }) => option.id || null}
            onChange={() => {}}
          />
        </StyledNavigationItem>
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.center} />
      <StyledNavigationList $align={ALIGN.right}>
        <StyledNavigationItem style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <Avatar name="David Michael" size="scale1000" />
          <ParagraphSmall marginTop={0} marginBottom={0} marginLeft="6px">
            Hi, David
          </ParagraphSmall>
        </StyledNavigationItem>
      </StyledNavigationList>
    </HeaderNavigation>
  );
}

export default Header;
