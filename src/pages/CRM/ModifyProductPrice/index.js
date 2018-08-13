/**
 * create at 2018/08/13
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useStrict } from 'mobx';
import { observer } from 'mobx-react/native';
import { moderateScale } from '../../../utils/scale';

import NavItem from '../../../components/NavItem'

// components
import { CommStatusBar, LeftBackIcon } from '../../../components/Layout';
import { theme } from '../../../constants';

const ContainerView = styled.ScrollView`
flex: 1;
`;

const MainView = styled.View`
flex: 1;
background-color: #F6F6F6;
`
const HeaderView = styled.View`
height: ${moderateScale(215)};
background: #FFFFFF;
align-items: center;
padding-top: ${moderateScale(15)};
`
const ItemView = styled.View`
width: ${moderateScale(120)};
height: ${moderateScale(120)};
margin-bottom: ${moderateScale(15)};
`
const ItemImage = styled.View`
width: 100%;
height: 100%;
background-color: #0000ff;
`
const TextView = styled.View``

const ItemNameText = styled.Text`
font-family: ${theme.fontMedium};
font-size: ${moderateScale(16)};
color: #373737;
background-color: transparent;
`
const ItemPriceText = styled.Text`
font-family: ${theme.fontRegular};
font-size: ${moderateScale(14)};
color: #858585;
`
const ListView = styled.View`
background: #FFFFFF;
padding-left: ${moderateScale(15)};
padding-right: ${moderateScale(15)};
`

useStrict(true);

@observer
class ModifyProductPrice extends React.Component {

  render() {
    const navItemProps = {
      height: moderateScale(44),
      leftText: '价格表价格',
      leftTextStyle: {
        fontFamily: theme.fontRegular,
        fontSize: moderateScale(16),
        color: '#373737'
      },
      rightText: '¥99999.00',
      leftTextStyle: {
        fontFamily: theme.fontRegular,
        fontSize: moderateScale(16),
        color: '#AEAEAE'
      }
    }

    return (
      <ContainerView>
        <CommStatusBar />
        <MainView>
          <HeaderView>
            <ItemView><ItemImage /></ItemView>
            <TextView style={{marginBottom: moderateScale(5)}}><ItemNameText>电脑主机</ItemNameText></TextView>
            <TextView><ItemPriceText>标准价格：¥9000.00</ItemPriceText></TextView>
          </HeaderView>

          <ListView>
            <NavItem />

          </ListView>
        </MainView>
      </ContainerView>
    );
  }
}

ModifyProductPrice.navigationOptions = ({ navigation, screenProps }) => ({
  title: '产品目录',
  headerLeft: (
    <LeftBackIcon
      onPress={navigation.state.params ? navigation.state.params._close : null}
    />
  ),
});

ModifyProductPrice.defaultProps = {};

ModifyProductPrice.propTypes = {
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

export default ModifyProductPrice;
