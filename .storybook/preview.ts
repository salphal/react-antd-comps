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
    //  content center layout
    layout: 'fullscreen',
    /**
     * right aside
     * https://storybook.js.org/docs/writing-docs/autodocs#configure-the-table-of-contents
     */
    docs: {
      toc: true,
    },
    // stories order
    options: {
      storySort: {
        order: [],
      },
    },
  },
};

export default preview;
