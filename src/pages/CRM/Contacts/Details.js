/**
 * @component Details.js
 * @description 联系人详情页面
 * @time 2018/8/12
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styled from 'styled-components';
import { observer } from 'mobx-react/native';
import { CommStatusBar, LeftBackIcon, NativeUtil, ToastUtil } from 'xn-react-native-applets';

// constants
import { theme, routers } from 'constants';
import { ModuleType } from 'constants/enum';

// utils
import { getUserId } from 'utils/base';
import { getNewId } from 'service/app';

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

import ContactsModel from '../../../logicStores/contacts';
import DynamicModel from '../../../logicStores/dynamic';
import AttachmentModel from '../../../logicStores/attachment';

const { nativeCallPhone } = NativeUtil;

const TotalView = styled.View`
  height: ${theme.moderateScale(70)};
  padding: 0 ${theme.moderateScale(60)}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid ${theme.borderColor};
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

const dynamicContactList = `${ModuleType.contact}List`;

@observer
class Details extends React.Component {
  state = {
    tabIndex: 0,
    cacheImageMap: {},
  };
  componentDidMount() {
    this.getDynamicList();
    this.getContactDetail();
    this.getContactTotal();
  }
  componentWillUnmount() {
    DynamicModel.clearModuleType();
  }
  onTabChange = (index) => {
    this.setState({ tabIndex: index });
  };
  onEndReached = () => {
    const { total = 0, [dynamicContactList]: list = [], pageNumber = 1, loadingMore } = DynamicModel.dynamicList;
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
        businessType: ModuleType.contact,
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
      moduleType: ModuleType.contact,
    }, () => {
      this.setState({ cacheImageMap: {} });
      callback && callback();
    });
  };
  onPressPhone = () => {
    const { contactDetails: { map } } = ContactsModel;
    nativeCallPhone(map.mobilePhone || map.phoneNumber);
  };
  onPressChoiceTeam = () => {
    const {
      props: {
        navigation: { navigate, state },
      },
    } = this;
    const { item } = state.params || {};
    const { contactDetails: { map } } = ContactsModel;
    if (!Object.keys(map).length) return;
    if (map.ownerUserId && (getUserId() !== map.ownerUserId)) return;
    navigate(routers.teamRoles, {
      ownerUserId: map.ownerUserId,
      moduleId: map.id,
      moduleType: ModuleType.contact,
      callback: (obj) => {
        ContactsModel.updateOwnerUserReq({
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
      moduleType: ModuleType.contact,
      moduleId: item.id,
    });
  };
  getContactDetail = () => {
    const { item } = this.props.navigation.state.params || {};
    ContactsModel.getContactDetailsReq(item);
  };
  getContactTotal = () => {
    const { item } = this.props.navigation.state.params || {};
    ContactsModel.getContactTotalReq(item);
  };
  renderTotalItem = () => {
    const {
      contactTotal: {
        scheduleTotal, taskTotal, salesTotal,
      },
      contactDetails: { map },
    } = ContactsModel;
    const {
      props: {
        navigation: { navigate },
      },
    } = this;
    const hasData = Object.keys(map).length;
    const list = [
      {
        title: '日程',
        text: scheduleTotal,
        onPress: () => {
          if (!hasData) return;
          navigate(routers.upcomingScheduleList, {
            moduleId: map.id,
            moduleType: ModuleType.contact,
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
            moduleType: ModuleType.contact,
          });
        },
      },
      {
        title: '销售机会',
        text: salesTotal,
        onPress: () => {
          if (!hasData) return;
          navigate(routers.salesChance, {
            customerId: map.id,
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
      list: ['动态', '联系人资料'],
      activeIndex: tabIndex,
      onChange: index => this.onTabChange(index),
    };
    const { contactDetails: { map } } = ContactsModel;
    const detailHeaderProps = {
      item: map,
      onPressPhone: this.onPressPhone,
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
        [dynamicContactList]: list = [],
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
      contactDetails: { list = [], refreshing },
    } = ContactsModel;
    const flatProps = {
      data: list,
      ListHeaderComponent: this.renderHeader(),
      renderItemElem: <ActivityDetailsItem />,
      onRefresh: this.getContactDetail,
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
      contactDetails: { map },
    } = ContactsModel;
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
                onPress={() => navigate(routers.contactEditorMore, { item: map })}
              />
            )
        }
      </ContainerView>
    );
  }
}

Details.navigationOptions = ({ navigation }) => ({
  title: '联系人',
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
