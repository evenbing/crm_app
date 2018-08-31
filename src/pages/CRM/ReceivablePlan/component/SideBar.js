/**
 * @component SideBar.js
 * @description 侧边栏
 * @time 2018/7/1
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../../../constants';

// components
import TouchableView from '../../../../components/TouchableView';
import Thumbnail from '../../../../components/Thumbnail';
import { FooterGroup } from '../../../../components/Drawer';

const ContainerView = styled.View`
  background-color: ${theme.whiteColor};
  flex: 1;
  justify-content: space-between;
`;

const HeaderView = styled.ScrollView``;

const TitleText = styled.Text`
  font-size: ${theme.moderateScale(18)};
  margin-top: ${theme.moderateScale(15)};
  color: #373737;
  padding: 0 ${theme.moderateScale(10)}px;
`;

const HeaderTitleText = styled.Text`
  margin-top: ${props => theme.moderateScale(props.marginTop || 17)};
  font-family: ${theme.fontRegular};
  font-size: ${theme.moderateScale(16)};
  color: #7B7B7B;
  padding: 0 ${theme.moderateScale(10)}px;
`;

const HeaderLabelView = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const HeaderLabelItem = styled.View`
  padding: 0 ${theme.moderateScale(13)}px;
  height: ${theme.moderateScale(22)}px;
  background-color: ${props => props.active ? '#B4E8C4' : '#EFEFEF'};
  border-radius: ${theme.moderateScale(4)}px;
  margin-left: ${theme.moderateScale(8)}px;
  margin-top: ${theme.moderateScale(11)}px;
  margin-bottom: ${theme.moderateScale(9)}px;
  align-items: center;
  justify-content: center;
`;

const HeaderLabelText = styled.Text`
  font-family: ${theme.fontRegular};
  font-size: ${theme.moderateScale(13)}px;
  color: ${props => props.active ? theme.primaryColor : '#4D4D4D'};
`;

const AddView = styled.View`
  margin-top: ${theme.moderateScale(31)};
  padding-left: ${theme.moderateScale(10)};
  padding-right: ${theme.moderateScale(18)};
`;

const AddButtonView = styled(TouchableView)`
  flex: 1;
  height: ${theme.moderateScale(48)};
  border: 1px solid ${theme.primaryColor};
  border-radius: ${theme.moderateScale(4)};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const AddButtonText = styled.Text`
  font-size: ${theme.moderateScale(16)};
  color: ${theme.primaryColor};
  margin-left: ${theme.moderateScale(10)};
`;

class SideBar extends React.PureComponent {
  state = {
    statusIndex: -1,
    typeList: [{
      name: '不限',
    }, {
      name: '已计划',
    }, {
      name: '进行中',
    }, {
      name: '已完成',
    }, {
      name: '未完成',
    }],
    typeIndex: -1,
    timeIndex: -1,
  }
  onToggle = (type, index) => {
    let currIndex = index;
    if (this.state[type] === index) {
      currIndex = -1;
    }
    this.setState({ [type]: currIndex });
  }
  onReset = () => {
    this.setState({
      statusIndex: -1,
      typeIndex: -1,
      timeIndex: -1,
    });
  }
  onSubmit = () => {
    const {
      state: {
        statusIndex,
        typeList,
        typeIndex,
        timeIndex,
      },
      props: {
        statusList,
        timeList,
      },
    } = this;
    this.props.onFilter({
      status: statusList[statusIndex],
      type: typeList[typeIndex],
      time: timeList[timeIndex],
    });
  }
  renderLabelItem = (list, state, type) => {
    return (
      list.map((value, index) => (
        <TouchableView
          key={value.name}
          onPress={() => this.onToggle(type, index)}
        >
          <HeaderLabelItem
            active={index === state}
          >
            <HeaderLabelText
              active={index === state}
            >
              {value.name}
            </HeaderLabelText>
          </HeaderLabelItem>
        </TouchableView>
      ))
    );
  }
  render() {
    const {
      state: {
        statusIndex,
        typeList,
        typeIndex,
        timeIndex,
      },
      props: {
        statusList,
        timeList,
      },
    } = this;
    return (
      <ContainerView>
        <HeaderView>
          <TitleText>字段筛选</TitleText>
          <HeaderTitleText marginTop={25}>活动状态</HeaderTitleText>
          <HeaderLabelView>
            {this.renderLabelItem([...statusList], statusIndex, 'statusIndex')}
          </HeaderLabelView>
          <HeaderTitleText>活动类型</HeaderTitleText>
          <HeaderLabelView>
            {this.renderLabelItem([...typeList], typeIndex, 'typeIndex')}
          </HeaderLabelView>
          <HeaderTitleText>开始日期</HeaderTitleText>
          <HeaderLabelView>
            {this.renderLabelItem([...timeList], timeIndex, 'timeIndex')}
          </HeaderLabelView>
          <AddView>
            <AddButtonView>
              <Thumbnail
                source={require('../../../../img/drawer/add.png')}
                size={19}
              />
              <AddButtonText>添加筛选字段</AddButtonText>
            </AddButtonView>
          </AddView>
        </HeaderView>
        <FooterGroup
          onReset={this.onReset}
          onSubmit={this.onSubmit}
        />
      </ContainerView>
    );
  }
}

SideBar.defaultProps = {
  statusList: [],
  timeList: [],
  onFilter: () => null,
};

SideBar.propTypes = {
  statusList: PropTypes.arrayOf(PropTypes.any),
  timeList: PropTypes.arrayOf(PropTypes.any),
  onFilter: PropTypes.func,
};

export default SideBar;
