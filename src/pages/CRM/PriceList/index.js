/**
 * @component index.js
 * @description 价格表页面
 * @time 2018/8/12
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Switch } from 'react-native';
import { useStrict } from 'mobx/';
import { observer } from 'mobx-react/native';
import { moderateScale } from '../../../utils/scale';

// components
import { CommStatusBar, LeftBackIcon } from '../../../components/Layout';
import { ContainerScrollView } from '../../../components/Styles/Layout';
import NavItem from '../../../components/NavItem';
import { routers } from '../../../constants';
import theme from '../../../constants/theme';

const NavListView = styled.View`
  margin-top: ${moderateScale(15)};
  background-color: #FFFFFF;
`;

const SwitchProps = {
  onTintColor: theme.primaryColor,
  style: {
    transform: [
      { scale: 0.8 },
      { translateX: moderateScale(10) },
    ],
  },
};

useStrict(true);

@observer
class PriceList extends React.Component {
  state = {
    stanValue: false,
    inteValue: false,
  };
  render() {
    const {
      state: {
        stanValue,
        inteValue,
      },
      props: {
        navigation,
      },
    } = this;
    return (
      <ContainerScrollView
        bottomPadding
      >
        <CommStatusBar />
        <NavListView>
          <NavItem
            leftText="标准价格表"
            height={44}
            onPress={() => navigation.navigate(routers.standardPriceList)}
            right={
              <Switch
                value={stanValue}
                onValueChange={stanValue => this.setState({ stanValue })}
                {...SwitchProps}
              />
            }
          />
          <NavItem
            leftText="内部报价"
            height={44}
            isLast
            onPress={() => navigation.navigate(routers.internalPriceList)}
            right={
              <Switch
                value={inteValue}
                onValueChange={inteValue => this.setState({ inteValue })}
                {...SwitchProps}
              />
            }
          />
        </NavListView>
      </ContainerScrollView>
    );
  }
}

PriceList.navigationOptions = ({ navigation }) => ({
  title: '价格表',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
});

PriceList.defaultProps = {};

PriceList.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    goBack: PropTypes.func,
    navigate: PropTypes.func,
    setParams: PropTypes.func,
    state: PropTypes.shape({
      key: PropTypes.string,
      routeName: PropTypes.string,
      params: PropTypes.object,
    }),
  }).isRequired,
};

export default PriceList;
