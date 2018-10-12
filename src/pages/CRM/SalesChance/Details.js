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
import { theme, routers } from '../../../constants';
import { ModuleType } from '../../../constants/enum';
import { getNewId } from '../../../service/app';
import Toast from '../../../utils/toast';

// components
import { CommStatusBar, LeftBackIcon } from '../../../components/Layout';
import { ContainerView } from '../../../components/Styles/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import DetailsHead from './components/DetailsHead';
import FlatListTable from '../../../components/FlatListTable';
import TabContainer from '../../../components/TabContainer';
import DynamicList from '../../../components/Details/DynamicList';
import ActivityDetailsItem from './components/ActivityDetailsItem';
import SendFooter from '../../../components/Details/SendFooter';
import EditorFooter from '../../../components/Details/EditorFooter';

import SalesChanceModel from '../../../logicStores/salesChance';
import DynamicModel from '../../../logicStores/dynamic';
import AttachmentModel from '../../../logicStores/attachment';
import { formatDateByMoment, getUserId } from '../../../utils/base';

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
      Toast.showError(err.message);
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
      moduleId: item.key,
      moduleType: ModuleType.opportunity,
    }, () => {
      this.setState({ cacheImageMap: {} });
      callback && callback();
    });
  };

  onPressFollow = () => {
    const { salesChanceDetail: { map } } = SalesChanceModel;
    SalesChanceModel.updateFollowStatusReq({
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
    const { salesChanceDetail: { map } } = SalesChanceModel;
    if (map.ownerUserId && (getUserId() !== map.ownerUserId)) return;
    navigate(routers.selectEmployee, {
      callback: (obj) => {
        SalesChanceModel.updateOwnerUserReq({
          id: item.id,
          ownerUserId: obj.userId,
          ownerUserName: obj.userName,
        });
      },
    });
  };

  onPressStatus = ({ key }) => {
    const { salesChanceDetail: { map } } = SalesChanceModel;
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
    SalesChanceModel.updateSalesChanceReq({
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
      moduleType: ModuleType.opportunity,
      moduleId: item.key,
    });
  };

  getSalesChanceDetail = () => {
    const { item: { id } } = this.props.navigation.state.params || {};
    SalesChanceModel.getSalesChanceReq({ id });
  };

  getDetailItem = (item) => {
    this.detailItem = item;
  }

  renderTotalItem = () => {
    const list = [
      { title: '日程', text: '12' },
      { title: '任务', text: '2' },
      { title: '联系人', text: '5' },
      { title: '销售线索', text: '11' },
      { title: '销售机会', text: '8' },
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
    const { salesChanceDetail: { map } } = SalesChanceModel;
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
          height={15}
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
      onRefresh: this.onRefresh,
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
