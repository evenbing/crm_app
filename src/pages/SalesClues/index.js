/**
 * @component index.js
 * @description 销售线索页面
 * @time 2018/8/6
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { useStrict } from 'mobx';
import { SwipeRow } from 'native-base';
import { observer } from 'mobx-react/native';
import { theme } from '../../constants';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../components/Layout';
import SearchInput from '../../components/SearchInput';
import { ContainerView } from '../../components/Styles/Layout';
import { ScreenTab } from '../../components/Customer';
import FlatListTable from '../../components/FlatListTable';
import ListItem from './ListItem';
import ButtonList from './ButtonList';

useStrict(true);

@observer
class SalesClues extends React.Component {
  state = {
    activeIndex: 0,
  };
  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
  }
  onPressRight = () => alert('right');
  onChange = ({ index, isLast }) => {
    this.setState({ activeIndex: index });
    if (isLast) {
      // TODO open drawer
      alert('isLast');
    }
  };
  renderItem = (props) => {
    return (
      <SwipeRow
        disableRightSwipe
        rightOpenValue={-((44 * 3) + 15 + 15)}
        style={{
          paddingTop: 0,
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 0,
          backgroundColor: '#fff',
          borderBottomWidth: 0,
        }}
        preview
        body={
          <ListItem {...props} />
        }
        right={
          <ButtonList
            list={[1, 2]}
            onPressItem={({ index, item }) => alert(`item:${JSON.stringify(item)}, index: ${index}`)}
          />
        }
      />
    );
  };
  render() {
    const {
      state: { activeIndex },
    } = this;
    return (
      <ContainerView>
        <CommStatusBar />
        <SearchInput />
        <ScreenTab
          data={['跟进时间', '我负责的', '筛选']}
          activeIndex={activeIndex}
          onChange={this.onChange}
        />
        <FlatListTable
          data={[
            { name: '李总', company: '西风网络', status: 0 },
            { name: '张总', company: '阿里巴巴', status: 1 },
            { name: '何总', company: '字体跳动', status: 0 },
          ]}
          keyExtractor={item => item.name}
          renderItem={this.renderItem}
        />

      </ContainerView>
    );
  }
}

SalesClues.navigationOptions = ({ navigation, screenProps }) => ({
  title: '销售线索',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
  headerRight: (
    <RightView
      onPress={navigation.state.params ? navigation.state.params.onPressRight : null}
      right="新增"
      rightStyle={{
        color: theme.primaryColor,
      }}
    />
  ),
});

SalesClues.defaultProps = {};

SalesClues.propTypes = {
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

export default SalesClues;

