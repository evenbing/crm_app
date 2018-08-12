import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';
import { useStrict } from 'mobx';
import { observer } from 'mobx-react/native';

import { moderateScale } from '../../../utils/scale';
// components
import { CommStatusBar, LeftBackIcon } from '../../../components/Layout';
import { theme } from '../../../constants'

const ContainerView = styled.ScrollView`
  flex: 1;
  background-color: #F6F6F6;
`;

const MainView = styled.View`
`;

const HeaderView = styled.View`
height: ${moderateScale(224)};
align-items: center;
`;

const TextView = style.View`

`

const IconImage = style.Image`

`

const MediumText = styled.Text`
font-family: ${theme.fontMedium};
font-size: ${moderateScale(20)};
color: #ffffff;
background-color: transparent;
`
const RegularText = styled.Text`
font-family: ${theme.fontRegular};
font-size: ${moderateScale(14)};
color: #ffffff;
background-color: transparent;
`

const FooterView = styled.View`
position: absolute;
bottom: 0;
left: 0;
right: 0;
height: ${moderateScale(50)};
borderTopWidth: 1px;
borderTopColor: #F6F6F6;
`;

useStrict(true);

@observer
class ReimbursementPlanDetail extends React.Component {

  render() {
    return (
      <ContainerView>
        <CommStatusBar />
        <MainView>
          <LinearGradient
            start={{ x: 1.0, y: 0.0 }}
            end={{ x: 0.0, y: 1.0 }}
            colors={['#98CE5E', '#019D55']}
          >
            <HeaderView>
              <MediumText style={{marginTop: moderateScale(50)}}>20180909-0001</MediumText>
              <RegularText style={{marginTop: moderateScale(4)}}></RegularText>
              <View style={{marginTop: moderateScale(10)}}><MediumText >负责人：张三</MediumText><</View>
              <RegularText style={{marginTop: moderateScale(10)}}>计划回款金额：¥100,000,000.00</RegularText>
            </HeaderView>
          </LinearGradient>
        </MainView>
        <FooterView></FooterView>
      </ContainerView>
    );
  }
}

ReimbursementPlanDetail.navigationOptions = ({ navigation, screenProps }) => ({
  title: '回款计划资料',
  headerLeft: (
    <LeftBackIcon
      onPress={navigation.state.params ? navigation.state.params._close : null}
    />
  ),
});

ReimbursementPlanDetail.defaultProps = {};

ReimbursementPlanDetail.propTypes = {
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

export default ReimbursementPlanDetail;
