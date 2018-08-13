/**
 * @component ActivityDetailsItem.js
 * @description 活动详情组件
 * @time 2018/8/13
 * @author JUSTIN XU
 */
import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../constants';

// components
import NavItemComponent from '../NavItem';

const ContainerView = styled.View``;

const HeaderTitleView = styled.View`
  height: ${theme.moderateScale(44)};
  padding: 0 ${theme.moderateScale(15)}px;
  flex-direction: row;
  align-items: center;
`;

const HeaderTitleText = styled.Text`
  color: ${theme.primaryColor};
`;

const RightSuffix = styled.Text`
  margin-left: ${theme.moderateScale(13)};
  color: #373737;
  font-size: ${theme.moderateScale(16)};
`;

class ActivityDetailsItem extends React.PureComponent {
  renderHeaderItem = text => (
    <HeaderTitleView>
      <HeaderTitleText>{text}</HeaderTitleText>
    </HeaderTitleView>
  );
  renderBasicItem = (leftText, rightText, rightSuffix) => (
    <NavItemComponent
      height={44}
      leftText={leftText}
      rightText={rightText}
      showNavIcon={false}
      rightTextStyle={{
        color: theme.textGrayColor,
      }}
      rightSuffix={rightSuffix}
    />
  );
  render() {
    return (
      <ContainerView>
        {this.renderHeaderItem('基本信息')}
        {this.renderBasicItem('姓名', '活动名称')}
        {this.renderBasicItem('性别', '2018-09-09')}
        {this.renderBasicItem('公司名称', '2018-09-09')}
        {this.renderBasicItem('部门', '部门部门部门')}
        {this.renderBasicItem('职务', '职务职务')}
        {this.renderHeaderItem('联系信息')}
        {this.renderBasicItem('开始日期', '2018-09-09')}
        {this.renderBasicItem('结束日期', '2018-09-09')}
        {this.renderBasicItem('活动成本', '10000', <RightSuffix>元</RightSuffix>)}
      </ContainerView>
    );
  }
}

ActivityDetailsItem.defaultProps = {};

ActivityDetailsItem.propTypes = {};

export default ActivityDetailsItem;
