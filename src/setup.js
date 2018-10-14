import { AppRegistry } from 'react-native';
import App from './app';

if (!__DEV__) {
  global.console = {
    info: () => {
    },
    log: () => {
    },
    warn: () => {
    },
    error: () => {
    },
  };
  global.debug = true;
} else {
  console.ignoredYellowBox = [
    'Warning: checkPropTypes',
    'Warning: React.createClass',
    'Warning: PropTypes',
  ];
}

AppRegistry.registerComponent('crm_app', () => App);
