/**
 * @component Details.js
 * @description 合同详情页面
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
import { formatDateByMoment, getUserId } from '../../../utils/base';
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

import ContractModel from '../../../logicStores/contract';
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

const dynamicPactList = `${ModuleType.pact}List`;

@observer
class Details extends React.Component {
  state = {
    tabIndex: 0,
    cacheImageMap: {},
  };
  componentDidMount() {
    this.getDynamicList();
    this.getContractDetail();
    this.getContractTotal();
  }
  componentWillUnmount() {
    DynamicModel.clearModuleType();
  }
  onTabChange = (index) => {
    this.setState({ tabIndex: index });
  };
  onEndReached = () => {
    const { total = 0, [dynamicPactList]: list = [], pageNumber = 1, loadingMore } = DynamicModel.dynamicList;
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
        businessType: ModuleType.pact,
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
      moduleType: ModuleType.pact,
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
    const { contractDetails: { map } } = ContractModel;
    if (map.ownerId && (getUserId() !== map.ownerId)) return;
    navigate(routers.selectEmployee, {
      callback: (obj) => {
        ContractModel.updateOwnerUserReq({
          id: item.id,
          ownerIdBefore: map.ownerId,
          ownerIdAfter: obj.userId,
          ownerNameBefore: map.ownerName,
          ownerNameAfter: obj.userName,
        });
      },
    });
  };
  onPressStatus = ({ key }) => {
    const { contractDetails: { map } } = ContractModel;
    if (map.status === key) return;
    let {
      startDate,
      endDate,
      pactDate,
    } = map;
    const {
      salesleadName,
    } = map;
    if (startDate) {
      startDate = formatDateByMoment(startDate);
    }
    if (endDate) {
      endDate = formatDateByMoment(endDate);
    }
    if (pactDate) {
      pactDate = formatDateByMoment(pactDate);
    }
    let salesOpportunitiesName = null;
    if (salesleadName) {
      salesOpportunitiesName = salesleadName;
    }
    ContractModel.updateContractReq({
      salesOpportunitiesName,
      ...map,
      startDate,
      endDate,
      pactDate,
      status: key,
    });
  };
  getDynamicList = (pageNumber = 1) => {
    const { item } = this.props.navigation.state.params || {};
    DynamicModel.getDynamicListReq({
      pageNumber,
      moduleType: ModuleType.pact,
      moduleId: item.id,
    });
  };
  getContractDetail = () => {
    const { item } = this.props.navigation.state.params || {};
    ContractModel.getContractDetailsReq(item);
  };
  getContractTotal = () => {
    const { item } = this.props.navigation.state.params || {};
    ContractModel.getContactTotalReq({
      ...item,
      moduleType: ModuleType.pact,
    });
  };
  renderTotalItem = () => {
    const {
      navigation: {
        navigate,
        state,
      },
    } = this.props;
    const {
      contractTotal: { issueTotal, attaTotal },
      contractDetails: { map },
    } = ContractModel;
    const { item } = state.params || {};
    const list = [
      {
        title: '文档',
        text: attaTotal,
        onPress: () => {
          this.props.navigation.navigate(routers.relatedDocs, {
            item: map,
            moduleType: ModuleType.pact,
          });
        },
      },
      { title: '回款', text: issueTotal, onPress: () => { navigate(routers.receivable, { id: item.id }); } },
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
      list: ['动态', '合同详情'],
      activeIndex: tabIndex,
      onChange: index => this.onTabChange(index),
    };
    const { contractDetails: { map } } = ContractModel;
    const detailHeaderProps = {
      item: map,
      onPressChoiceTeam: this.onPressChoiceTeam,
      onPressStatus: this.onPressStatus,
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
      contractDetails: { list = [], refreshing },
    } = ContractModel;
    const flatProps = {
      data: list,
      ListHeaderComponent: this.renderHeader(),
      renderItemElem: <ActivityDetailsItem />,
      onRefresh: this.getContractDetail,
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
      contractDetails: { map },
    } = ContractModel;
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
                onPress={() => navigate(routers.contractEditorMore, { item: map })}
              />
            )
        }
      </ContainerView>
    );
  }
}

Details.navigationOptions = ({ navigation }) => ({
  title: '合同资料',
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
