import { NavigationActions } from 'react-navigation';

let _navigator;// eslint-disable-line

export const registerTopNavigator = (navigatorRef) => {
  _navigator = navigatorRef;
};

export const reset = (routeName, params) => {
  _navigator.dispatch({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName,
        params,
      }),
    ],
  });
};

export const push = (routeName, params) => {
  _navigator.dispatch(NavigationActions.push({
    routeName,
    params,
  }));
};

export const pop = (n) => {
  _navigator.dispatch(NavigationActions.pop({
    n,
  }));
};

export const navigate = (routeName, params) => {
  _navigator.dispatch(NavigationActions.navigate({
    routeName,
    params,
  }));
};

export const goBack = (key) => {
  _navigator.dispatch(NavigationActions.back({
    key,
  }));
};
