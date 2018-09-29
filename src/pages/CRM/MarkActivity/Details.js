/**
 * @component Details.js
 * @description 详情页面
 * @time 2018/8/14
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styled from 'styled-components';
import { observer } from 'mobx-react/native';

import { theme, routers } from '../../../constants';
// import { moderateScale } from '../../../utils/scale';

// components
import { CommStatusBar, LeftBackIcon } from '../../../components/Layout';
import { ContainerView } from '../../../components/Styles/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import DetailsHead from './components/DetailsHead';
import FlatListTable from '../../../components/FlatListTable';
import TabContainer from '../../../components/TabContainer';
import DynamicList from '../../../components/Details/DynamicList';
import SendFooter from '../../../components/Details/SendFooter';
import EditorFooter from '../../../components/Details/EditorFooter';
import ActivityDetailsItem from './components/ActivityDetailsItem';
import { ModuleType } from '../../../constants/enum';
import MarkActivityModel from '../../../logicStores/markActivity';
import DynamicModel from '../../../logicStores/dynamic';

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
  };

  componentDidMount() {
    this.getDynamicList();
    this.getMarkActivityDetail();
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

  getDynamicList = (pageNumber = 1) => {
    const { item } = this.props.navigation.state.params || {};
    DynamicModel.getDynamicListReq({
      pageNumber,
      moduleType: ModuleType.activity,
      moduleId: item.key,
    });
  };

  getMarkActivityDetail = () => {
    const { item: { key } } = this.props.navigation.state.params || {};
    MarkActivityModel.getMarkActivityDetailReq({ id: key });
  };

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
    return (
      <View>
        <DetailsHead />
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
  renderDynamicItem = ({ item, index }) => (
    <DynamicList isFrist={index === 0} data={item} />
  );

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
      keyExtractor: item => item.key,
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
    <ActivityDetailsItem {...item} />
  );
  renderDetailsView = () => {
    const {
      markActivityDetail: {
        refreshing,
        map,
      }, 
    } = MarkActivityModel;
    const list = map ? [map] : [];
    const flatProps = {
      keyExtractor: (item, index) => index,
      data: list,
      ListHeaderComponent: this.renderHeader(),
      renderItem: this.renderDetailsItem,
      onRefresh: this.getMarkActivityDetail,
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
      },
      props: {
        navigation: { navigate },
      },
    } = this;
    return (
      <ContainerView
        backgroundColor={theme.whiteColor}
        bottomPadding
      >
        <CommStatusBar />
        {
          tabIndex === 0
            ?
            this.renderDynamicView()
            :
            this.renderDetailsView()
        }
        {
          tabIndex === 0 ?
            <SendFooter />
            : (
              <EditorFooter
                onPress={() => navigate(routers.contactsEditor)}
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
