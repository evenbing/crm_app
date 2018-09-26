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
import ActivityDetailsItem from '../../../components/Details/ActivityDetailsItem';
import SendFooter from '../../../components/Details/SendFooter';
import EditorFooter from '../../../components/Details/EditorFooter';
// import TouchableView from '../../../components/TouchableView';

import SalesCluesModel from '../../../logicStores/salesClues';
import DynamicModel from '../../../logicStores/dynamic';
import { ModuleType } from '../../../constants/enum';

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

const dynamicPactList = `${ModuleType.customer}List`;

@observer
class Details extends React.Component {
  state = {
    tabIndex: 0,
  };

  componentDidMount() {
    this.getDynamicList();
    this.getSalesCuleDetail();
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

  onPressTeamMember = () => {
    const {
      navigation: {
        navigate,
      },
    } = this.props;
    navigate(routers.teamMembers);
  }

  getDynamicList = (pageNumber = 1) => {
    const { item } = this.props.navigation.state.params || {};
    DynamicModel.getDynamicListReq({
      pageNumber,
      moduleType: ModuleType.pact,
      moduleId: item.key,
    });
  };

  getSalesCuleDetail = () => {
    const { item: { key } } = this.props.navigation.state.params || {};
    SalesCluesModel.getSalesClueDetailReq({ id: key });
  };

  renderTotalItem = () => {
    const list = [
      { title: '日程', text: '12' },
      { title: '任务', text: '10' },
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
        <DetailsHead onPressTeamMember={this.onPressTeamMember} />
        <TotalView>
          {this.renderTotalItem()}
        </TotalView>
        <HorizontalDivider height={15} />
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

  renderDetailsItem = props => (
    <ActivityDetailsItem {...props} />
  );

  renderDetailsView = () => {
    const list = [
      {
        type: 1,
        list: [{ url: true }, {}, {}],
      },
    ];
    const { refreshing = false, loadingMore = false } = {};
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
      loadingMore,
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
                onPress={() => navigate(routers.contactCreate)}
              />
            )
        }
      </ContainerView>
    );
  }
}

Details.navigationOptions = ({ navigation }) => ({
  title: '销售线索',
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
