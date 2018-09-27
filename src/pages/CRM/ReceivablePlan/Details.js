/**
 * @component Details.js
 * @description 回款计划详情页面
 * @time 2018/8/12
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View } from 'react-native';
import { observer } from 'mobx-react/native';
import { theme, routers } from '../../../constants';
import { ModuleType } from '../../../constants/enum';

// components
import { CommStatusBar, LeftBackIcon } from '../../../components/Layout';
import { ContainerView } from '../../../components/Styles/Layout';
import FlatListTable from '../../../components/FlatListTable';
import TabContainer from '../../../components/TabContainer';
import DynamicList from '../../../components/Details/DynamicList';
import SendFooter from '../../../components/Details/SendFooter';
import EditorFooter from '../../../components/Details/EditorFooter';
import DetailsHead from './components/DetailsHead';
import ActivityDetailsItem from './components/ActivityDetailsItem';

import ReceivablePlanModel from '../../../logicStores/receivablePlan';
import DynamicModel from '../../../logicStores/dynamic';

const TotalView = styled.View`
  height: ${theme.moderateScale(70)};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid ${theme.borderColor};
`;

const ItemView = styled.View`
  align-items: center;
  flex: 1;
`;

const NumberText = styled.Text`
  color: ${theme.primaryColor};
  font-size: ${theme.moderateScale(18)};
  font-family: ${theme.fontMedium};
`;

const TitleText = styled.Text`
  color: #494949;
  font-family: ${theme.fontRegular};
`;

const dynamicPlanList = `${ModuleType.plan}List`;

@observer
class Details extends React.Component {
  state = {
    tabIndex: 0,
  };
  componentDidMount() {
    this.getDynamicList();
    this.getPlanDetail();
  }
  componentWillUnmount() {
    DynamicModel.clearModuleType();
  }
  onTabChange = (index) => {
    this.setState({ tabIndex: index });
  };
  onEndReached = () => {
    const { total = 0, [dynamicPlanList]: list = [], pageNumber = 1, loadingMore } = DynamicModel.dynamicList;
    if (list.length < total && loadingMore === false) {
      this.getDynamicList(pageNumber + 1);
    }
  };
  onPressSend = ({ content, contentType }, callback) => {
    const { item } = this.props.navigation.state.params || {};
    debugger;
    DynamicModel.createDynamicReq({
      content,
      contentType,
      moduleId: item.id,
      moduleType: ModuleType.plan,
    }, () => {
      callback && callback();
    });
  };
  onPressChoiceTeam = () => {
    const {
      props: {
        navigation: { navigate, state },
      },
    } = this;
    const { item } = state.params || {};
    const { receivablePlanDetails: { map } } = ReceivablePlanModel;
    navigate(routers.selectEmployee, {
      callback: (obj) => {
        ReceivablePlanModel.updateOwnerUserReq({
          id: item.id,
          ownerIdBefore: map.ownerId,
          ownerIdAfter: obj.id,
          ownerNameBefore: map.ownerName,
          ownerNameAfter: obj.userName,
        });
      },
    });
  };
  getDynamicList = (pageNumber = 1) => {
    const { item } = this.props.navigation.state.params || {};
    DynamicModel.getDynamicListReq({
      pageNumber,
      moduleType: ModuleType.plan,
      moduleId: item.id,
    });
  };
  getPlanDetail = () => {
    const { item } = this.props.navigation.state.params || {};
    ReceivablePlanModel.getReceivablePlanDetailsReq(item);
  };
  renderTotalItem = () => {
    const list = [
      { title: '文档', text: '12' },
    ];
    return list.map(_ => (
      <ItemView key={_.title}>
        <NumberText>{_.text}</NumberText>
        <TitleText>{_.title}</TitleText>
      </ItemView>
    ));
  };
  renderHeader = () => {
    const { tabIndex } = this.state;
    const tabProps = {
      list: ['动态', '活动详情'],
      activeIndex: tabIndex,
      onChange: index => this.onTabChange(index),
    };
    const { receivablePlanDetails: { map } } = ReceivablePlanModel;
    const detailHeaderProps = {
      item: map,
      onPressChoiceTeam: this.onPressChoiceTeam,
    };
    return (
      <View>
        <DetailsHead {...detailHeaderProps} />
        <TotalView>
          {this.renderTotalItem()}
        </TotalView>
        <TabContainer {...tabProps} />
      </View>
    );
  };
  renderDynamicView = () => {
    const {
      dynamicList: {
        [dynamicPlanList]: list = [],
        refreshing,
        loadingMore,
      } = {},
      getDynamic,
    } = DynamicModel;
    const flatProps = {
      data: getDynamic,
      ListHeaderComponent: this.renderHeader(),
      renderItemElem: <DynamicList />,
      onRefresh: this.getDynamicList,
      onEndReached: this.onEndReached,
      flatListStyle: {
        marginBottom: theme.moderateScale(50),
      },
      refreshing,
      noDataBool: !refreshing && list.length === 0,
      loadingMore,
    };
    return (
      <FlatListTable {...flatProps} />
    );
  };
  renderDetailsItem = props => (
    <ActivityDetailsItem {...props} />
  );
  renderDetailsView = () => {
    const {
      receivablePlanDetails: { list = [], refreshing },
    } = ReceivablePlanModel;
    const flatProps = {
      data: list,
      ListHeaderComponent: this.renderHeader(),
      renderItem: this.renderDetailsItem,
      onRefresh: this.getPlanDetail,
      flatListStyle: {
        marginBottom: theme.moderateScale(50),
      },
      refreshing,
    };
    return (
      <FlatListTable {...flatProps} />
    );
  };
  render() {
    const {
      state: {
        tabIndex,
      },
      props: {
        navigation: { navigate, state },
      },
    } = this;
    const { item } = state.params || {};
    const bool = tabIndex === 0;
    return (
      <ContainerView
        backgroundColor={theme.whiteColor}
        bottomPadding
      >
        <CommStatusBar />
        {
          bool ?
            this.renderDynamicView()
            :
            this.renderDetailsView()
        }
        {
          bool ?
            <SendFooter
              onPressSend={this.onPressSend}
            />
            : (
              <EditorFooter
                onPress={() => navigate(routers.receivablePlanEditorMore, { item })}
              />
            )
        }
      </ContainerView>
    );
  }
}

Details.navigationOptions = ({ navigation }) => ({
  title: '回款计划资料',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
});

Details.defaultProps = {};

Details.propTypes = {
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

export default Details;
