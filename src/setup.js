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
    'Warning: Invalid argument supplied to oneOf',
  ];
}

AppRegistry.registerComponent('crm_app', () => App);
