/**
 * @component Details.js
 * @description 销售机会详情页面
 * @time 2018/8/14
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { observer } from 'mobx-react/native';
import styled from 'styled-components';
import { CommStatusBar, LeftBackIcon, ToastUtil } from 'xn-react-native-applets';

// constants
import { theme, routers } from 'constants';
import { ModuleType, TASK_SCHEDULE_CATEGORY } from 'constants/enum';

// utils
import { formatDateByMoment, getUserId } from 'utils/base';

// service
import { getNewId } from 'service/app';

// logicStores
import SalesChanceModel from 'logicStores/salesChance';
import DynamicModel from 'logicStores/dynamic';
import AttachmentModel from 'logicStores/attachment';

// components
import { ContainerView } from 'components/Styles/Layout';
import { HorizontalDivider } from 'components/Styles/Divider';
import FlatListTable from 'components/FlatListTable';
import TabContainer from 'components/TabContainer';
import DynamicList from 'components/Details/DynamicList';
import SendFooter from 'components/Details/SendFooter';
import EditorFooter from 'components/Details/EditorFooter';
import ActivityDetailsItem from './components/ActivityDetailsItem';
import DetailsHead from './components/DetailsHead';


const TotalView = styled.View`
  height: ${theme.moderateScale(70)};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ItemView = styled.TouchableOpacity`
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

const dynamicPactList = `${ModuleType.opportunity}List`;

@observer
class Details extends React.Component {
  state = {
    tabIndex: 0,
    cacheImageMap: {},
  };

  componentDidMount() {
    this.getDynamicList();
    this.getSalesChanceDetail();
    this.getSalesChanceTotal();
  }
  componentWillUnmount() {
    DynamicModel.clearModuleType();
  }
  onTabChange = (index) => {
    this.setState({ tabIndex: index });
  };
  onEndReached = () => {
    const {
      total = 0,
      [dynamicPactList]: list = [],
      pageNumber = 1,
      loadingMore,
    } = DynamicModel.dynamicList;
    if (list.length < total && loadingMore === false) {
      this.getDynamicList(pageNumber + 1);
    }
  };
  onPressImage = async ({ file }) => {
    try {
      const businessId = await getNewId();
      AttachmentModel.uploadImageReq({
        file,
        businessId,
        businessType: ModuleType.opportunity,
      }, (result) => {
        const { attachment = {} } = result;
        this.setState({
          cacheImageMap: {
            businessId,
            ...attachment,
          },
        });
      });
    } catch (err) {
      ToastUtil.showError(err.message);
    }
  };
  onPressSend = ({ content, contentType }, callback) => {
    const {
      state: {
        cacheImageMap,
      },
      props: {
        navigation: { state },
      },
    } = this;
    const { item } = state.params || {};
    DynamicModel.createDynamicReq({
      id: cacheImageMap.businessId,
      content,
      contentType,
      moduleId: item.id,
      moduleType: ModuleType.opportunity,
    }, () => {
      this.setState({ cacheImageMap: {} });
      callback && callback();
    });
  };
  onPressFollow = () => {
    const { salesChanceDetail: { map } } = SalesChanceModel;
    if (!Object.keys(map).length) return;
    SalesChanceModel.updateFollowStatusReq({
      objectType: ModuleType.opportunity,
      objectId: map.id,
      objectName: map.name,
      followTime: formatDateByMoment(new Date()),
      userId: getUserId(),
      //
      follow: map.follow,
      followId: map.followId,
    });
  };
  onPressChoiceTeam = () => {
    const {
      props: {
        navigation: { navigate, state },
      },
    } = this;
    const { item } = state.params || {};
    const { salesChanceDetail: { map } } = SalesChanceModel;
    if (!Object.keys(map).length) return;
    if (map.ownerUserId && (getUserId() !== map.ownerUserId)) {
      ToastUtil.showWarning('你当前无此权限');
      return;
    }
    navigate(routers.teamRoles, {
      ownerUserId: map.ownerUserId,
      moduleId: map.id,
      moduleType: ModuleType.opportunity,
      callback: (obj) => {
        SalesChanceModel.updateOwnerUserReq({
          id: item.id,
          ownerUserId: obj.userId,
          ownerUserName: obj.userName,
        });
      },
    });
  };
  getDynamicList = (pageNumber = 1) => {
    const { item } = this.props.navigation.state.params || {};
    DynamicModel.getDynamicListReq({
      pageNumber,
      moduleType: ModuleType.opportunity,
      moduleId: item.id,
    });
  };
  getSalesChanceDetail = () => {
    const { item } = this.props.navigation.state.params || {};
    SalesChanceModel.getSalesChanceDetailReq(item);
  };
  getSalesChanceTotal = () => {
    const { item } = this.props.navigation.state.params || {};
    SalesChanceModel.getSalesChanceTotalReq(item);
  };
  getDetailItem = (item) => {
    this.detailItem = item;
  };
  renderTotalItem = () => {
    const {
      salesClueTotal: {
        scheduleTotal, taskTotal, contactTotal, productTotal, pactTotal,
      },
      salesChanceDetail: { map },
    } = SalesChanceModel;
    const {
      props: {
        navigation: { navigate },
      },
    } = this;
    const hasData = Object.keys(map).length;
    const isOtherUser = !(map.ownerUserId && (getUserId() === map.ownerUserId));
    const list = [
      {
        title: '日程',
        text: scheduleTotal,
        onPress: () => {
          if (!hasData) return;
          navigate(routers.upcomingScheduleList, {
            moduleId: map.id,
            moduleType: ModuleType.opportunity,
            category: TASK_SCHEDULE_CATEGORY.all,
            isOtherUser,
          });
        },
      },
      {
        title: '任务',
        text: taskTotal,
        onPress: () => {
          if (!hasData) return;
          navigate(routers.upcomingTaskList, {
            moduleId: map.id,
            moduleType: ModuleType.opportunity,
            category: TASK_SCHEDULE_CATEGORY.all,
            isOtherUser,
          });
        },
      },
      {
        title: '联系人',
        text: contactTotal,
        onPress: () => {
          navigate(routers.contacts, {
            opportunityId: map.id,
          });
        },
      },
      {
        title: '产品',
        text: productTotal,
        onPress: () => {
          if (!hasData) return;
          navigate(routers.productList, {
            opportunityId: map.id,
          });
        },
      },
      {
        title: '合同',
        text: pactTotal,
        onPress: () => {
          if (!hasData) return;
          navigate(routers.contract, {
            opportunityId: map.id,
          });
        },
      },
    ];
    return list.map(_ => (
      <ItemView key={_.title} onPress={_.onPress}>
        <NumberText>{_.text}</NumberText>
        <TitleText>{_.title}</TitleText>
      </ItemView>
    ));
  };
  renderHeader = () => {
    const { tabIndex } = this.state;
    const tabProps = {
      list: ['动态', '销售机会详情'],
      activeIndex: tabIndex,
      onChange: index => this.onTabChange(index),
    };
    const { salesChanceDetail: { map } } = SalesChanceModel;
    const detailHeaderProps = {
      item: map,
      onPressFollow: this.onPressFollow,
      onPressChoiceTeam: this.onPressChoiceTeam,
    };
    return (
      <View>
        <DetailsHead {...detailHeaderProps} />
        <TotalView>
          {this.renderTotalItem()}
        </TotalView>
        <HorizontalDivider
          height={1}
          boarderBottomWidth={1}
          boarderBottomColor={theme.borderColor}
        />
        <TabContainer {...tabProps} />
      </View>
    );
  };
  renderDynamicView = () => {
    const {
      dynamicList: {
        [dynamicPactList]: list = [],
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
  renderDetailsItem = ({ item }) => (
    <ActivityDetailsItem {...item} getDetailItem={this.getDetailItem} />
  );
  renderDetailsView = () => {
    const {
      salesChanceDetail: {
        refreshing,
        map,
      },
    } = SalesChanceModel;
    const list = map ? [map] : [];
    const flatProps = {
      data: list,
      ListHeaderComponent: this.renderHeader(),
      renderItem: this.renderDetailsItem,
      ItemSeparatorComponent: null,
      onRefresh: this.getSalesChanceDetail,
      onEndReached: this.onEndReached,
      flatListStyle: {
        marginBottom: theme.moderateScale(50),
      },
      refreshing,
      noDataBool: !refreshing && list.length === 0,
    };
    return (
      <FlatListTable {...flatProps} />
    );
  };

  render() {
    const {
      state: {
        tabIndex,
        cacheImageMap,
      },
      props: {
        navigation: { navigate },
      },
    } = this;
    const bool = tabIndex === 0;
    // const {
    //   salesChanceDetail: {
    //     map,
    //   },
    // } = SalesChanceModel;
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
              cacheImageMap={cacheImageMap}
              onPressSend={this.onPressSend}
              onPressImage={this.onPressImage}
            />
            : (
              <EditorFooter
                onPress={() => navigate(routers.salesChanceEditorMore, { item: this.detailItem })}
              />
            )
        }
      </ContainerView>
    );
  }
}

Details.navigationOptions = ({ navigation }) => ({
  title: '销售机会',
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
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default Details;
