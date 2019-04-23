/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { AppRegistry, YellowBox } from 'react-native';
import App from './src/App.js';
import { name as appName } from './app.json';


YellowBox.ignoreWarnings([
  'Warning: bind(): You are binding a component method to the component. React does this for you automatically in a high-performance way, so you can safely remove this call. See ScrollView',
]);

AppRegistry.registerComponent(appName, () => App);