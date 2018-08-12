import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useStrict } from 'mobx';
import { observer } from 'mobx-react/native';
import { moderateScale } from '../../../../utils/scale';

// components
import { CommStatusBar, LeftBackIcon } from '../../../../components/Layout';

const ContainerView = styled.ScrollView`
  flex: 1;
  background-color: #F6F6F6;
`;

const MainView = styled.View`
height: ${moderateScale(224)};
`

const FooterView = styled.View`
position: absolute;
bottom: 0;
left: 0;
right: 0;
height: ${moderateScale(50)};
borderTopWidth: 1px;
borderTopColor: #F6F6F6;
`
useStrict(true);

@observer
class ReimbursementPlanDetail extends React.Component {

  render() {
    return (
      <ContainerView>
        <CommStatusBar />
        <MainView></MainView>
        <FooterView></FooterView>
      </ContainerView>
    );
  }
}

ReimbursementPlanDetail.navigationOptions = ({ navigation, screenProps }) => ({
  title: '回款计划',
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
