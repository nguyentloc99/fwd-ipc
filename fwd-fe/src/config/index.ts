import * as productionConfig from './config.production';
import * as localConfig from './config.local';

const appStage = process.env.REACT_APP_STAGE
  ? process.env.REACT_APP_STAGE.trim()
  : 'production';

interface ConfigModel {
  BASE_URL: string;
  CDN: string;
}

// eslint-disable-next-line import/no-mutable-exports
let CONFIG: ConfigModel;

if (appStage === 'production') {
  CONFIG = productionConfig;
} else {
  CONFIG = localConfig;
}

export default CONFIG;
