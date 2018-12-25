/**
 * @component MemberList.js
 * @description 成员列表
 * @time 2018/8/28
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  ListView,
  RefreshControl,
  Dimensions,
} from 'react-native';
import SilderItem from './SilderItem';
import MemberItem from './MemberItem';
import ListHeader from './ListHeader';
import TouchableView from '../TouchableView';
import { isAndroid } from '../../utils/utils';
import theme from '../../constants/theme';

const { height } = Dimensions.get('window');

const ContainerView = styled.View`
  flex: 1;
`;

const SilderView = styled.View`
  position: absolute;
  height: 80%;
  top: 10%;
  bottom: 0;
  right: ${theme.moderateScale(10)};
  background-color: transparent;
  align-items: center;
  justify-content: center;
`;

class MemberList extends React.PureComponent {
  state = {
    dataSource: [],
    letters: [],
    activeIndex: 0,
  };

  componentDidMount() {
    this.initData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const {
      dataList,
    } = nextProps;
    if (dataList.length > 0 && dataList !== this.props.dataList) {
      this.initData(nextProps);
    }
  }

  onScroll = (e) => {
    const { y } = e.nativeEvent.contentOffset;
    const { activeIndex } = this.state;
    let position = 0;
    for (let i = 0; i < this.totalHeight.length; i++) {
      position += this.totalHeight[i];
      if (position > y) {
        if (activeIndex === i) return;
        this.setState({ activeIndex: i });
        return;
      }
    }
  }

  onScrollTo = (index) => {
    let position = 0;
    for (let i = 0; i < this.totalHeight.length - 1; i++) {
      if (i >= index) continue;
      position += this.totalHeight[i];
    }
    if (isAndroid()) position += 2;
    this.refListView.scrollTo({ y: position });
  }

  initData = ({ dataList, headerHeight, rowHeight, sectionHeaderHeight }) => {
    const dataBlob = {};
    dataList.forEach((value) => {
      const key = value.sortLetters.toUpperCase();

      if (dataBlob[key]) {
        const subList = dataBlob[key];
        subList.push(value);
      } else {
        const subList = [];
        subList.push(value);
        dataBlob[key] = subList;
      }
    });
    let last = 0;
    if (dataBlob['#']) {
      last = dataBlob['#'];
      delete dataBlob['#'];
    }
    const sectionIDs = [...Object.keys(dataBlob).sort()];
    if (last) {
      sectionIDs.push('#');
      dataBlob['#'] = last;
    }
    this.totalHeight = []; // 每个字母对应的城市和字母的总高度
    const rowIDs = sectionIDs.map((sectionID, index) => {
      const thisRow = [];
      const count = dataBlob[sectionID].length;
      for (let i = 0; i < count; i++) {
        thisRow.push(i);
      }
      let eachHeight = sectionHeaderHeight + (rowHeight * thisRow.length);
      // only has header && first element
      if (index === 0 && headerHeight) {
        eachHeight += headerHeight;
      }
      this.totalHeight.push(eachHeight);
      return thisRow;
    });

    const ds = new ListView.DataSource({
      getRowData: (dataBlob, sectionID, rowID) => {
        return dataBlob[sectionID][rowID];
      },
      getSectionHeaderData: (dataBlob, sectionID) => {
        return sectionID;
      },
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    this.setState({
      dataSource: ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
      letters: sectionIDs,
    });
  }

  renderSectionHeader = title => (
    <ListHeader title={title} />
  );

  renderListRow = (item) => {
    return (
      <MemberItem
        key={item.name}
        item={item}
        onPress={this.props.onPressItem}
        style={{
          height: this.props.rowHeight,
          backgroundColor: theme.whiteColor,
          paddingLeft: 0,
          paddingRight: 0,
        }}
      />
    );
  };

  renderSilder = () => {
    const {
      letters = [],
      activeIndex,
    } = this.state;
    return (
      letters.map((letter, index) => (
        <TouchableView
          key={letter}
          activeOpacity={0.6}
          onPress={() => {
            this.onScrollTo(index, letter);
          }}
        >
          <SilderItem
            active={activeIndex === index}
            title={letter}
          />
        </TouchableView>
      ))
    );
  };

  render() {
    const {
      state: {
        dataSource,
      },
      props: {
        renderHeader,
        dataList = [],
        refreshing,
        onRefresh,
        ...restProps
      },
    } = this;
    if (dataList.length === 0 || dataSource.length === 0) {
      return null;
    }
    return (
      <ContainerView>
        <ListView
          ref={(ref) => { this.refListView = ref; }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          onScroll={this.onScroll}
          dataSource={dataSource}
          renderHeader={renderHeader}
          renderSectionHeader={this.renderSectionHeader}
          renderRow={this.renderListRow}
          enableEmptySections
          legacyImplementation
          initialListSize={500}
          {...restProps}
        />
        <SilderView height={height}>
          {this.renderSilder()}
        </SilderView>
      </ContainerView>
    );
  }
}

MemberList.defaultProps = {
  dataList: [],
  renderHeader: () => null,
  headerHeight: 0,
  rowHeight: theme.moderateScale(74),
  sectionHeaderHeight: theme.moderateScale(20),
  onPressItem: () => null,
  refreshing: false,
  onRefresh: () => null,
};

MemberList.propTypes = {
  dataList: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  renderHeader: PropTypes.func,
  headerHeight: PropTypes.number,
  rowHeight: PropTypes.number,
  sectionHeaderHeight: PropTypes.number,
  onPressItem: PropTypes.func,
  refreshing: PropTypes.bool,
  onRefresh: PropTypes.func,
};

export default MemberList;
