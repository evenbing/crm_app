/**
 * @component Customer.js
 * @description 客户页面
 * @time 2018/8/6
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useStrict } from 'mobx';
import { observer } from 'mobx-react/native';
import { theme } from '../../constants';
// import LinearGradient from 'react-native-linear-gradient';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../components/Layout';
import SearchInput from '../../components/SearchInput';
import { ContainerView } from '../../components/Styles/Layout';

const TextView = styled.Text``;

useStrict(true);

@observer
class Customer extends React.Component {
  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
  }
  onPressRight = () => alert('right');
  render() {
    return (
      <ContainerView>
        <CommStatusBar />
        <SearchInput />
        <TextView>
          Customer
        </TextView>
      </ContainerView>
    );
  }
}

Customer.navigationOptions = ({ navigation, screenProps }) => ({
  title: 'CRM',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
  headerRight: (
    <RightView
      onPress={navigation.state.params ? navigation.state.params.onPressRight : null}
      right="新增"
      rightStyle={{
        color: theme.primaryColor,
      }}
    />
  ),
});

Customer.defaultProps = {};

Customer.propTypes = {
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

export default Customer;

