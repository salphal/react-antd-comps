import type { Preview } from '@storybook/react';
import '../lib/global.css';

const preview: Preview = {
  parameters: {
    actions: {
      // argTypesRegex: '^on[A-Z].*'
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'fullscreen',
    docs: {
      toc: true,
    },
  },
};

export default preview;
