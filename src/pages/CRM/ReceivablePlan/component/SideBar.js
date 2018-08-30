/**
 * @component SideBar.js
 * @description 侧边栏
 * @time 2018/7/1
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Platform } from 'react-native';
import { theme } from '../../../../constants';
import { getHeaderPadding, getFooterBottom } from '../../../../utils/utils';
import TouchableView from '../../../../components/TouchableView';

const ContainerView = styled.View`
  padding-top: ${getHeaderPadding() || 0};
  background-color: ${theme.whiteColor};
  flex: 1;
  justify-content: space-between;
  padding-bottom: ${getFooterBottom() || 0};
`;

const FooterView = styled.View`
  height: 49px;
  background-color: #F7F7F7;
  padding: 0 10px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const FooterButtonView = styled.View`
  width: 136px;
  background: ${theme.primaryColor};
  border-width: 1px;
  border-color: ${theme.primaryColor};
  border-radius: 4px;
  height: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
`;

const FooterButtonGroup = styled(TouchableView)`
  width: 50%;
`;

const FooterButtonText = styled.Text`
  flex: 1;
  border-top-left-radius: ${props => props.active ? 0 : '4px'};
  border-bottom-left-radius: ${props => props.active ? 0 : '4px'};
  border-top-right-radius: ${props => props.active ? '4px' : 0};
  border-bottom-right-radius:${props => props.active ? '4px' : 0};
  overflow: hidden;
  color: ${props => props.active ? '#ffffff' : theme.primaryColor};
  font-family: ${theme.fontRegular};
  font-size: 13px;
  height: 100%;
  text-align: center;
  line-height: ${Platform.OS === 'ios' ? '28' : '23'};
  letter-spacing: -0.44px;
  background-color:  ${props => props.active ? theme.primaryColor : '#ffffff'};
`;

const HeaderView = styled.ScrollView``;

const HeaderTitleText = styled.Text`
  margin-top: ${props => props.marginTop || '34px'};
  font-family: ${theme.fontRegular};
  font-size: 13px;
  color: #7A7A7A;
  letter-spacing: -0.44px;
  padding: 0 10px;
`;

const HeaderLabelView = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const HeaderLabelItem = styled.View`
  padding-left: 5px;
  padding-right: 5px;
  height: 22px;
  background-color: ${props => props.active ? '#DCE5FB' : '#EFEFEF'};
  border-radius: 4px;
  margin-left: 7px;
  margin-top: 15px;
  align-items: center;
  justify-content: center;
`;

const HeaderLabelText = styled.Text`
  font-family: ${theme.fontRegular};
  font-size: 13px;
  color: ${props => props.active ? theme.primaryColor : '#4D4D4D'};
  letter-spacing: -0.44px;
`;

class SideBar extends React.PureComponent {
  state = {
    gradeIndex: -1,
    birthdayList: [{
      name: '今日',
    }, {
      name: '本周',
    }, {
      name: '本月',
    }],
    birthdayIndex: -1,
    labelIndex: -1,
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
      gradeIndex: -1,
      birthdayIndex: -1,
      labelIndex: -1,
    });
  }
  onSubmit = () => {
    const {
      state: {
        gradeIndex,
        birthdayList,
        birthdayIndex,
        labelIndex,
      },
      props: {
        gradeList,
        labelItem,
      },
    } = this;
    this.props.onFilter({
      grade: gradeList[gradeIndex],
      birthday: birthdayList[birthdayIndex],
      label: labelItem[labelIndex],
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
        gradeIndex,
        birthdayList,
        birthdayIndex,
        labelIndex,
      },
      props: {
        gradeList,
        labelItem,
      },
    } = this;
    return (
      <ContainerView>
        <HeaderView>
          <HeaderTitleText marginTop={20}>等级</HeaderTitleText>
          <HeaderLabelView>
            {this.renderLabelItem([...gradeList], gradeIndex, 'gradeIndex')}
          </HeaderLabelView>
          <HeaderTitleText>生日</HeaderTitleText>
          <HeaderLabelView>
            {this.renderLabelItem([...birthdayList], birthdayIndex, 'birthdayIndex')}
          </HeaderLabelView>
          <HeaderTitleText>标签</HeaderTitleText>
          <HeaderLabelView>
            {this.renderLabelItem([...labelItem], labelIndex, 'labelIndex')}
          </HeaderLabelView>
        </HeaderView>
        <FooterView>
          <FooterButtonView>
            <FooterButtonGroup
              onPress={this.onReset}
            >
              <FooterButtonText>重置</FooterButtonText>
            </FooterButtonGroup>
            <FooterButtonGroup
              onPress={this.onSubmit}
            >
              <FooterButtonText active>确定</FooterButtonText>
            </FooterButtonGroup>
          </FooterButtonView>
        </FooterView>
      </ContainerView>
    );
  }
}

SideBar.defaultProps = {
  gradeList: [],
  labelItem: [],
  onFilter: () => null,
};

SideBar.propTypes = {
  gradeList: PropTypes.arrayOf(PropTypes.any),
  labelItem: PropTypes.arrayOf(PropTypes.any),
  onFilter: PropTypes.func,
};

export default SideBar;
