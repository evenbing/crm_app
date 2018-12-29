/**
 * @component Details.js
 * @description 市场活动详情页面
 * @time 2018/8/14
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styled from 'styled-components';
import { observer } from 'mobx-react/native';
import { CommStatusBar, LeftBackIcon, ToastUtil } from 'xn-react-native-applets';

// constants
import { theme, routers } from 'constants';
import { ModuleType } from 'constants/enum';

// utils
import { getUserId, formatDateByMoment } from 'utils/base';
import { getNewId } from 'service/app';

// components
import { ContainerView } from 'components/Styles/Layout';
import { HorizontalDivider } from 'components/Styles/Divider';
import FlatListTable from 'components/FlatListTable';
import TabContainer from 'components/TabContainer';
import DynamicList from 'components/Details/DynamicList';
import SendFooter from 'components/Details/SendFooter';
import EditorFooter from 'components/Details/EditorFooter';
import DetailsHead from './components/DetailsHead';
import ActivityDetailsItem from './components/ActivityDetailsItem';

import MarkActivityModel from '../../../logicStores/markActivity';
import DynamicModel from '../../../logicStores/dynamic';
import AttachmentModel from '../../../logicStores/attachment';

const TotalView = styled.View`
  height: ${theme.moderateScale(70)};
  flex-direction: row;
  justify-content: center;
  align-items: center;
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

const dynamicPactList = `${ModuleType.activity}List`;

@observer
class Details extends React.Component {
  state = {
    tabIndex: 0,
    cacheImageMap: {},
  };
  componentDidMount() {
    this.getDynamicList();
    this.getMarkActivityDetail();
    this.getMarkActivityTotal();
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
        businessType: ModuleType.activity,
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
      moduleType: ModuleType.activity,
    }, () => {
      this.setState({ cacheImageMap: {} });
      callback && callback();
    });
  };
  onPressFollow = () => {
    const { markActivityDetail: { map } } = MarkActivityModel;
    if (!Object.keys(map).length) return;
    MarkActivityModel.updateFollowStatusReq({
      objectType: ModuleType.activity,
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
    const { markActivityDetail: { map } } = MarkActivityModel;
    if (!Object.keys(map).length) return;
    if (map.ownerUserId && (getUserId() !== map.ownerUserId)) return;
    navigate(routers.teamRoles, {
      ownerUserId: map.ownerUserId,
      moduleId: map.id,
      moduleType: ModuleType.activity,
      callback: (obj) => {
        MarkActivityModel.updateOwnerUserReq({
          id: item.id,
          ownerUserId: obj.userId,
          ownerUserName: obj.userName,
        });
      },
    });
  };
  onPressStatus = ({ key }) => {
    const { markActivityDetail: { map } } = MarkActivityModel;
    if (!Object.keys(map).length) return;
    if (map.status === key) return;
    let {
      beginDate,
      endDate,
    } = map;
    if (beginDate) {
      beginDate = formatDateByMoment(beginDate);
    }
    if (endDate) {
      endDate = formatDateByMoment(endDate);
    }
    MarkActivityModel.updateMarkActivityReq({
      ...map,
      beginDate,
      endDate,
      status: key,
    });
  };
  getDynamicList = (pageNumber = 1) => {
    const { item } = this.props.navigation.state.params || {};
    DynamicModel.getDynamicListReq({
      pageNumber,
      moduleType: ModuleType.activity,
      moduleId: item.id,
    });
  };
  getMarkActivityDetail = () => {
    const { item } = this.props.navigation.state.params || {};
    MarkActivityModel.getMarkActivityDetailReq(item);
  };
  getMarkActivityTotal = () => {
    const { item } = this.props.navigation.state.params || {};
    MarkActivityModel.getMarkActivityTotalReq(item);
  };
  renderTotalItem = () => {
    const {
      markActivityTotal: {
        scheduleTotal, taskTotal, saleClueTotal, saleChanceTotal,
      },
    } = MarkActivityModel;
    const list = [
      { title: '日程', text: scheduleTotal },
      { title: '任务', text: taskTotal },
      { title: '销售线索', text: saleClueTotal },
      { title: '销售机会', text: saleChanceTotal },
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
    const { markActivityDetail: { map } } = MarkActivityModel;
    const detailHeaderProps = {
      item: map,
      onPressFollow: this.onPressFollow,
      onPressChoiceTeam: this.onPressChoiceTeam,
      onPressStatus: this.onPressStatus,
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
  renderDetailsView = () => {
    const {
      markActivityDetail: {
        refreshing,
        list,
      },
    } = MarkActivityModel;
    const flatProps = {
      data: list,
      ListHeaderComponent: this.renderHeader(),
      renderItemElem: <ActivityDetailsItem />,
      onRefresh: this.getMarkActivityDetail,
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
        cacheImageMap,
      },
      props: {
        navigation: { navigate },
      },
    } = this;
    const bool = tabIndex === 0;
    const {
      markActivityDetail: {
        map,
      },
    } = MarkActivityModel;
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
                onPress={() => navigate(routers.markActivityEditorMore, { item: map })}
              />
            )
        }
      </ContainerView>
    );
  }
}

Details.navigationOptions = ({ navigation }) => ({
  title: '市场活动',
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
