import React from 'react';
import { Navigation } from 'baseui/side-navigation';

const items = [
  {
    title: 'Colors',
    itemId: '#colors',
    subNav: [
      {
        title: 'Primary',
        itemId: '#primary',
      },
      {
        title: 'Shades',
        itemId: '#shades',
        subNav: [
          {
            title: 'Dark',
            itemId: '#dark',
          },
          {
            title: 'Disabled',
            itemId: '#disabled',
            disabled: true,
          },
        ],
      },
    ],
  },
];

function SideBar() {
  const [activeItemId, setActiveItemId] = React.useState('#primary');
  return (
    <Navigation
      items={items}
      activeItemId={activeItemId}
      onChange={({ item }) => setActiveItemId(item.itemId)}
      overrides={{
        Root: {
          style: ({
            height: '100%',
            width: '250px',
            backgroundColor: '#222222',
            position: 'fixed',
          }),
        },

      }}
    />

  );
}

export default SideBar;
