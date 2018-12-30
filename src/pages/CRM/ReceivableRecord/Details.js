/**
 * @component Details.js
 * @description 回款记录详情页面
 * @time 2018/8/12
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View } from 'react-native';
import { observer } from 'mobx-react/native';
import { CommStatusBar, LeftBackIcon, ToastUtil } from 'xn-react-native-applets';

// constants
import { theme, routers } from 'constants';
import { ModuleType } from 'constants/enum';

// utils
import { formatDateByMoment, getUserId } from 'utils/base';

// service
import { getNewId } from 'service/app';

// logicStores
import ReceivableRecordModel from 'logicStores/receivableRecord';
import DynamicModel from 'logicStores/dynamic';
import AttachmentModel from 'logicStores/attachment';

// components
import { ContainerView } from 'components/Styles/Layout';
import FlatListTable from 'components/FlatListTable';
import TabContainer from 'components/TabContainer';
import DynamicList from 'components/Details/DynamicList';
import SendFooter from 'components/Details/SendFooter';
import EditorFooter from 'components/Details/EditorFooter';
import DetailsHead from './components/DetailsHead';
import ActivityDetailsItem from './components/ActivityDetailsItem';

const TotalView = styled.View`
  height: ${theme.moderateScale(70)};
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

const dynamicRecordList = `${ModuleType.record}List`;

@observer
class Details extends React.Component {
  state = {
    tabIndex: 0,
    cacheImageMap: {},
  };
  componentDidMount() {
    this.getDynamicList();
    this.getRecordDetail();
    this.getRecordTotal();
  }
  onTabChange = (index) => {
    this.setState({ tabIndex: index });
  };
  onEndReached = () => {
    const { total = 0, [dynamicRecordList]: list = [], pageNumber = 1, loadingMore } = DynamicModel.dynamicList;
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
        businessType: ModuleType.record,
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
      moduleType: ModuleType.record,
    }, () => {
      this.setState({ cacheImageMap: {} });
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
    const { receivableRecordDetails: { map } } = ReceivableRecordModel;
    if (!Object.keys(map).length) return;
    if (map.ownerUserId && (getUserId() !== map.ownerUserId)) {
      ToastUtil.showWarning('你当前无此权限');
      return;
    }
    navigate(routers.teamRoles, {
      ownerUserId: map.ownerId,
      moduleId: map.id,
      moduleType: ModuleType.record,
      callback: (obj) => {
        ReceivableRecordModel.updateReceivableRecordReq({
          id: item.id,
          ...map,
          receivableDate: map.receivableDate ? formatDateByMoment(map.receivableDate) : null,
          ownerId: obj.userId,
        });
      },
    });
  };
  getDynamicList = (pageNumber = 1) => {
    const { item } = this.props.navigation.state.params || {};
    DynamicModel.getDynamicListReq({
      pageNumber,
      moduleType: ModuleType.record,
      moduleId: item.id,
    });
  };
  getRecordDetail = () => {
    const { item } = this.props.navigation.state.params || {};
    ReceivableRecordModel.getReceivableRecordDetailsReq(item);
  };
  getRecordTotal = () => {
    const { item } = this.props.navigation.state.params || {};
    ReceivableRecordModel.getReceivableRecordTotalReq({
      ...item,
      moduleType: ModuleType.record,
    });
  };
  renderTotalItem = () => {
    const {
      receivableRecordTotal: { attaTotal },
      receivableRecordDetails: { map },
    } = ReceivableRecordModel;
    const list = [
      {
        title: '文档',
        text: attaTotal,
        onPress: () => {
          this.props.navigation.navigate(routers.relatedDocs, {
            item: map,
            moduleType: ModuleType.record,
          });
        },
      },
    ];
    return list.map(_ => (
      <ItemView key={_.title} onPress={_.onPress} >
        <NumberText>{_.text}</NumberText>
        <TitleText>{_.title}</TitleText>
      </ItemView>
    ));
  };
  renderHeader = () => {
    const { tabIndex } = this.state;
    const tabProps = {
      list: ['动态', '记录详情'],
      activeIndex: tabIndex,
      onChange: index => this.onTabChange(index),
    };
    const { receivableRecordDetails: { map } } = ReceivableRecordModel;
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
        [dynamicRecordList]: list = [],
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
      receivableRecordDetails: { list = [], map, refreshing },
    } = ReceivableRecordModel;
    const { status: isCanEditor = true } = map || {};
    const flatProps = {
      data: list,
      ListHeaderComponent: this.renderHeader(),
      renderItemElem: <ActivityDetailsItem />,
      onRefresh: this.getRecordDetail,
      flatListStyle: {
        marginBottom: isCanEditor ? theme.moderateScale(50) : 0,
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
    const {
      receivableRecordDetails: { map },
    } = ReceivableRecordModel;
    const bool = tabIndex === 0;
    const { status: isCanEditor = true } = map || {};
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
                isCanEditor={isCanEditor}
                onPress={() => navigate(routers.receivableRecordEditorMore, { item: map })}
              />
            )
        }
      </ContainerView>
    );
  }
}

Details.navigationOptions = ({ navigation }) => ({
  title: '回款记录资料',
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
