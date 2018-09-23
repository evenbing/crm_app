/**
 * @component Details.js
 * @description 联系人详情页面
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

import ContractModel from '../../../logicStores/contract';
import DynamicModel from '../../../logicStores/dynamic';

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
  };
  componentDidMount() {
    this.getDynamicList();
    this.getContractDetail();
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
  onPressSend = ({ content, contentType }, callback) => {
    const { item } = this.props.navigation.state.params || {};
    debugger;
    DynamicModel.createDynamicReq({
      content,
      contentType,
      moduleId: item.id,
      moduleType: ModuleType.pact,
    }, () => {
      callback && callback();
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
  renderTotalItem = () => {
    const {
      navigation: {
        navigate,
      },
    } = this.props;
    const list = [
      { title: '文档', text: '12', onPress: () => {} },
      { title: '合同', text: '3', onPress: () => { navigate(routers.receivable); } },
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
      list: ['动态', '活动详情'],
      activeIndex: tabIndex,
      onChange: index => this.onTabChange(index),
    };
    const { contractDetails: { map } } = ContractModel;
    return (
      <View>
        <DetailsHead item={map} />
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
  renderDetailsItem = props => (
    <ActivityDetailsItem {...props} />
  );
  renderDetailsView = () => {
    const {
      contractDetails: { list = [], refreshing },
    } = ContractModel;
    const flatProps = {
      data: list,
      ListHeaderComponent: this.renderHeader(),
      renderItem: this.renderDetailsItem,
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
                onPress={() => navigate(routers.contactCreate, { item })}
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
