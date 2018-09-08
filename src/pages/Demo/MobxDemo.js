/**
 * @component MobxDemo.js
 * @description MobxDemo
 * @time 2018/8/5
 * @author JUSTIN XU
 */
import React from 'react';
import { Text, Button } from 'react-native';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useStrict } from 'mobx';
import { observer } from 'mobx-react/native';
import RootToast from 'js-root-toast';
import DemoModel from '../../logicStores/demo';
import { deviceWidth, deviceHeight } from '../../utils/utils';

// components
import CommStatusBar from '../../components/Layout/CommStatusBar';
import LeftBackIcon from '../../components/Layout/LeftBackIcon';
import { Drawer } from '../../components/Drawer';

const ContainerView = styled.View``;
const TouchView = styled.TouchableOpacity`
  background-color: red;
  height: 40px;
  width: 100%;
`;

const DemoView = styled.View``;

const DemoItem = styled.TouchableOpacity`
  background-color: white;
  border-bottom-width: 1px;
  border-bottom-color: red;
  padding: 10px;
`;

const TextView = styled.Text`
  color: red;
`;

const FilterView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
  background-color: #3b7fc4;
  padding: 0 10px;
`;


const FilterItem = styled.TouchableOpacity`
  height: 100%;
  justify-content: center;
`;

const FilterText = styled.Text`
  color: ${props => props.actived ? '#e4393c' : '#000000'};
  font-size: 16px;
`;


useStrict(true);

const marginTop = 300;

@observer
class MobxDemo extends React.Component {
  state = {
    isVisible: false,
    filterVisible: false,
    activeIndex: 0,
    list: ['张三', '李四', '王五'],
  };
  onOpenDrawer = () => {
    this.setState({ isVisible: true });
  };
  onCloseDrawer = () => {
    this.setState({ isVisible: false });
  };
  onToggleFilter = () => {
    this.setState({ filterVisible: !this.state.filterVisible });
  };
  getFilterList = () => {
    const { activeIndex } = this.state;
    if (activeIndex === 0) return ['张三0', '李四0', '王五0'];
    if (activeIndex === 1) return ['张三1', '李四1', '王五1'];
    return ['张三2', '李四2', '王五2'];
  };
  renderHeader = () => {
    const {
      state: {
        activeIndex,
        list,
        filterVisible,
      },
    } = this;
    if (!list.length) return null;
    return (
      <FilterView>
        {
          list.map((_, i) => (
            <FilterItem
              key={_}
              onPress={() => {
              if (i !== activeIndex) {
                this.setState({ activeIndex: i });
              }
              if (i !== activeIndex && filterVisible) {
                //
              } else {
                this.onToggleFilter();
              }
            }}
            >
              <FilterText actived={i === activeIndex}>{_}</FilterText>
            </FilterItem>
          ))
        }
      </FilterView>
    );
  };
  renderDemoItem = () => {
    const { activeIndex } = this.state;
    const list = this.getFilterList();
    if (!list.length) return null;
    return list.map((_, i) => (
      <DemoItem
        onPress={() => {
          if (i !== activeIndex) {
            this.setState({
              activeIndex: i,
              filterVisible: false,
            });
          }
        }}
        key={i}
      >
        <FilterText actived={i === activeIndex}>{_}</FilterText>
      </DemoItem>
    ));
  };
  render() {
    const {
      state: {
        isVisible,
        filterVisible,
      },
    } = this;
    const drawerProps = {
      isVisible,
      onPressClose: this.onCloseDrawer,
      content: (
        <TouchView onPress={this.onCloseDrawer}>
          <TextView>Click Demo</TextView>
        </TouchView>
      ),
    };
    const filterModalProps = {
      visible: filterVisible,
      position: marginTop,
      duration: 0,
      opacity: 1,
      shadow: false,
      containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, .5)',
        // flexDirection: 'column-reverse',
        width: deviceWidth,
        height: deviceHeight - (marginTop > 0 ? marginTop : -marginTop),
        borderRadius: 0,
        padding: 0,
      },
      onHidden: () => {
        this.setState({ filterVisible: false });
      },
    };
    return (
      <ContainerView>
        <CommStatusBar />
        <RootToast {...filterModalProps} >
          <DemoView>
            {this.renderDemoItem()}
          </DemoView>
        </RootToast>
        <Text>Counter: {DemoModel.counter}</Text>
        <Text>Total clicks: {DemoModel.total}</Text>
        <Button onPress={DemoModel.increase} title="+" />
        <Button onPress={DemoModel.decrease} title="-" />
        <Button onPress={this.onOpenDrawer} title="open Drawer" />
        {this.renderHeader()}
        <Drawer {...drawerProps} />
      </ContainerView>
    );
  }
}

MobxDemo.navigationOptions = ({ navigation, screenProps }) => ({
  title: 'MBDemo',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
});

MobxDemo.defaultProps = {};

MobxDemo.propTypes = {};

export default MobxDemo;
