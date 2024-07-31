import type { StorybookConfig } from '@storybook/react-vite';
import { withoutVitePlugins } from '@storybook/builder-vite';

const config: StorybookConfig = {
  /** stories 文件范围 */
  stories: [
    '../lib/**/*.mdx',
    '../lib/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../lib/antd/**/*.mdx',
    '../lib/antd/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../lib/components/**/*.mdx',
    '../lib/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: ['@storybook/addon-essentials', '@storybook/addon-actions', '@chromatic-com/storybook'],

  framework: {
    name: '@storybook/react-vite',
    options: {
      legacyRootApi: true,
    },
  },

  docs: {},

  viteFinal: async (config) => ({
    ...config,
    plugins: await withoutVitePlugins(config.plugins, ['vite:dts']), // skip dts plugin
  }),

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};
export default config;
