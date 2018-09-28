/**
 * @component Create.js
 * @description 回款详情页面
 * @time 2018/9/2
 * @author JUSTIN XU
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { observer } from 'mobx-react/native';
import { theme, routers } from '../../../constants';
import { DataTitleTypes } from '../../../constants/enum';
import { moderateScale } from '../../../utils/scale';

// components
import { ContainerView } from '../../../components/Styles/Layout';
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import FlatListTable from '../../../components/FlatListTable';
import ReceivableTitle from './components/ReceivableTitle';
import ReceivableItem from './components/ReceivableItem';

import ReceivableModel from '../../../logicStores/receivable';

const RightViews = styled.View`
  flex-direction: row;
`;

const TEST_ID = '2331';

@observer
class Receivable extends Component {
  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
    this.getData();
  }
  onPressRight = (path) => {
    if (!path) return;
    const {
      props: {
        navigation: { navigate, state },
      },
    } = this;
    const { id = TEST_ID } = state.params || {};
    const { total } = ReceivableModel.receivableIssueList;
    navigate(path, {
      pactId: id,
      period: DataTitleTypes[total],
    });
  };
  onEndReached = () => {
    const { total, list, pageNumber, loadingMore } = ReceivableModel.receivableIssueList;
    if (list.length < total && loadingMore === false) {
      this.getData(pageNumber + 1);
    }
  };
  getData = () => {
    const { id = TEST_ID } = this.props.navigation.state.params || {};
    ReceivableModel.getReceivableIssueReq({ pactId: id });
  };

  render() {
    const {
      receivableIssueList: {
        pactPrice,
        totalPrice,
        list,
        refreshing,
        loadingMore,
      },
      getIssueList,
    } = ReceivableModel;
    const receivableTitleProps = {
      pactPrice,
      totalPrice,
    };
    const flatProps = {
      data: getIssueList,
      ListHeaderComponent: <ReceivableTitle {...receivableTitleProps} />,
      renderItemElem: <ReceivableItem />,
      onRefresh: this.getData,
      onEndReached: this.onEndReached,
      refreshing,
      noDataBool: !refreshing && list.length === 0,
      loadingMore,
    };
    return (
      <ContainerView>
        <CommStatusBar />
        <FlatListTable {...flatProps} />
      </ContainerView>
    );
  }
}

Receivable.navigationOptions = ({ navigation }) => {
  const { onPressRight } = navigation.state.params || {};
  return {
    title: '回款',
    headerLeft: (
      <LeftBackIcon
        onPress={() => navigation.goBack()}
      />
    ),
    headerRight: (
      <RightViews>
        <RightView
          onPress={onPressRight ? () => onPressRight(routers.receivablePlanCreate) : null}
          right="增加计划"
          rightStyle={{
            color: theme.primaryColor,
          }}
          rightViewStyle={{
            paddingLeft: 0,
            paddingRight: 0,
          }}
        />
        <RightView
          onPress={onPressRight ? () => onPressRight(routers.receivableRecordCreate) : null}
          right="增加记录"
          rightStyle={{
            color: theme.primaryColor,
          }}
          rightViewStyle={{
            paddingLeft: moderateScale(8),
            paddingRight: moderateScale(15),
          }}
        />
      </RightViews>
    ),
  };
};

Receivable.defaultProps = {};

Receivable.propTypes = {
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

export default Receivable;
