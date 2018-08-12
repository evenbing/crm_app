import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useStrict } from 'mobx';
import { observer } from 'mobx-react/native';
import { moderateScale } from '../../utils/scale';

// components
import { CommStatusBar, LeftBackIcon } from '../../components/Layout';

const ContainerView = styled.ScrollView`
  flex: 1;
  background-color: #F6F6F6
`;

useStrict(true);

@observer
class ReimbursementPlan extends React.Component {

  onNavHandler = path => {
    // this.props.navigation.navigate(path);
  };

  render() {
    const list = [
      {
        list: [{},{}]
      },
      {
        list: [{}]
      }
    ]

    return (
      <ContainerView>
        <CommStatusBar />
        <NavListView>
          {
            list.map((obj, index) => <ProductItemList key={index} data={obj} />)
          }
        </NavListView>
      </ContainerView>
    );
  }
}

ReimbursementPlan.navigationOptions = ({ navigation, screenProps }) => ({
  title: '产品目录',
  headerLeft: (
    <LeftBackIcon
      onPress={navigation.state.params ? navigation.state.params._close : null}
    />
  ),
});

ReimbursementPlan.defaultProps = {};

ReimbursementPlan.propTypes = {
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

export default ReimbursementPlan;
