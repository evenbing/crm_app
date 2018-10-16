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
import { getNewId } from '../../../service/app';
import Toast from '../../../utils/toast';

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
import AttachmentModel from '../../../logicStores/attachment';

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

const dynamicPlanList = `${ModuleType.plan}List`;

@observer
class Details extends React.Component {
  state = {
    tabIndex: 0,
    cacheImageMap: {},
  };
  componentDidMount() {
    this.getDynamicList();
    this.getPlanDetail();
    this.getPlanTotal();
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
  onPressImage = async ({ file }) => {
    try {
      const businessId = await getNewId();
      AttachmentModel.uploadImageReq({
        file,
        businessId,
        businessType: ModuleType.plan,
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
      moduleId: item.id,
      moduleType: ModuleType.plan,
    }, () => {
      this.setState({ cacheImageMap: {} });
      callback && callback();
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
  getPlanTotal = () => {
    const { item } = this.props.navigation.state.params || {};
    ReceivablePlanModel.getReceivablePlanTotalReq({
      ...item,
      moduleType: ModuleType.plan,
    });
  };
  renderTotalItem = () => {
    const {
      receivablePlanTotal: { attaTotal },
      receivablePlanDetails: { map },
    } = ReceivablePlanModel;
    const list = [
      {
        title: '文档',
        text: attaTotal,
        onPress: () => {
          this.props.navigation.navigate(routers.relatedDocs, {
            item: map,
            moduleType: ModuleType.plan,
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
      list: ['动态', '计划详情'],
      activeIndex: tabIndex,
      onChange: index => this.onTabChange(index),
    };
    const { receivablePlanDetails: { map } } = ReceivablePlanModel;
    const detailHeaderProps = {
      item: map,
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
  renderDetailsView = () => {
    const {
      receivablePlanDetails: { list = [], refreshing },
    } = ReceivablePlanModel;
    const flatProps = {
      data: list,
      ListHeaderComponent: this.renderHeader(),
      renderItemElem: <ActivityDetailsItem />,
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
        cacheImageMap,
      },
      props: {
        navigation: { navigate },
      },
    } = this;
    const {
      receivablePlanDetails: { map },
    } = ReceivablePlanModel;
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
              cacheImageMap={cacheImageMap}
              onPressSend={this.onPressSend}
              onPressImage={this.onPressImage}
            />
            : (
              <EditorFooter
                onPress={() => navigate(routers.receivablePlanEditorMore, { item: map })}
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
