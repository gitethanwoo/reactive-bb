import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'reactive-bb',
  slug: 'reactive-bb',
  extra: {
    openaiApiKey: process.env.OPENAI_API_KEY,
  },
}); 