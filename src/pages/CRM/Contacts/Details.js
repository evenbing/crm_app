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
import { theme, routers } from '../../../constants';
// import { moderateScale } from '../../../utils/scale';

// components
import { CommStatusBar, LeftBackIcon } from '../../../components/Layout';
import { ContainerView } from '../../../components/Styles/Layout';
import DetailsHead from './components/DetailsHead';
import FlatListTable from '../../../components/FlatListTable';
import TabContainer from '../../../components/TabContainer';
import DynamicList from '../../../components/Details/DynamicList';
import ActivityDetailsItem from '../../../components/Details/ActivityDetailsItem';
import SendFooter from '../../../components/Details/SendFooter';
import EditorFooter from '../../../components/Details/EditorFooter';
// import TouchableView from '../../../components/TouchableView';

const TotalView = styled.View`
  height: ${theme.moderateScale(70)};
  padding: 0 ${theme.moderateScale(60)}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid ${theme.borderColor};
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

class Details extends React.Component {
  state = {
    tabIndex: 0,
  };
  onTabChange = (index) => {
    this.setState({ tabIndex: index });
  };
  onRefresh = () => {
    //
  };
  onEndReached = () => {
    //
  };
  renderTotalItem = () => {
    const list = [
      { title: '日程', text: '12' },
      { title: '任务', text: '10' },
      { title: '销售机会', text: '3' },
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
      list: ['动态', '详细资料'],
      activeIndex: tabIndex,
      onChange: index => this.onTabChange(index),
    };
    return (
      <View>
        <DetailsHead />
        <TotalView>
          {this.renderTotalItem()}
        </TotalView>
        <TabContainer {...tabProps} />
      </View>
    );
  };
  renderDynamicItem = ({ item, index }) => (
    <DynamicList isFrist={index === 0} data={item} />
  );
  renderDynamicView = () => {
    const list = [
      {
        type: 1,
        list: [{ url: true }, {}, {}],
      },
      {
        type: 0,
        list: [{ url: true }, {}, {}],
      },
      {
        type: 1,
        list: [{ url: true }, {}, {}],
      },
    ];
    const { refreshing = false, loadingMore = false } = {};
    const flatProps = {
      keyExtractor: (item, index) => index,
      data: list,
      ListHeaderComponent: this.renderHeader(),
      renderItem: this.renderDynamicItem,
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
      keyExtractor: (item, index) => index,
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
                onPress={() => navigate(routers.contactEditor)}
              />
            )
        }
      </ContainerView>
    );
  }
}

Details.navigationOptions = ({ navigation, screenProps }) => ({
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
