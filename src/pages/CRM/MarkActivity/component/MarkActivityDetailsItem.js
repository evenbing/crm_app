/**
 * @component MarkActivityDetailsItem.js
 * @description 市场活动详情组件
 * @time 2018/8/13
 * @author JUSTIN XU
 */
import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../../../constants';

// components
import NavItemComponent from '../../../../components/NavItem';
import TitleItemComponent from '../../../../components/Details/TitleItem';

const ContainerView = styled.View``;

const RightSuffix = styled.Text`
  margin-left: ${theme.moderateScale(13)};
  color: #373737;
  font-size: ${theme.moderateScale(16)};
`;

const RemarkView = styled.View`
  padding: 0 ${theme.moderateScale(15)}px;
`;

const RemarkText = styled.Text`
  font-size: ${theme.moderateScale(14)};
  color: #AEAEAE;
`;

class MarkActivityDetailsItem extends React.PureComponent {
  renderBasicItem = (leftText, rightText, rightSuffix, rightStyle = {}, isLast = false) => (
    <NavItemComponent
      height={44}
      leftText={leftText}
      rightText={rightText}
      showNavIcon={false}
      isLast={isLast}
      rightTextStyle={{
        color: theme.textGrayColor,
        ...rightStyle,
      }}
      rightSuffix={rightSuffix}
    />
  );
  render() {
    return (
      <ContainerView>
        <TitleItemComponent
          text="基本信息"
        />
        {this.renderBasicItem('活动名称', '活动名称')}
        {this.renderBasicItem('活动状态', '活动状态')}
        {this.renderBasicItem('活动类型', '活动类型')}
        <TitleItemComponent
          text="活动说明"
          color="#373737"
          fontSize={16}
        />
        <RemarkView>
          <RemarkText>
            活动说明，活动说明，活动说明，活动说明，活动说明，活动说明，
          </RemarkText>
        </RemarkView>
        <TitleItemComponent
          text="计划信息"
        />
        {this.renderBasicItem('开始日期', '2018-09-09')}
        {this.renderBasicItem('结束日期', '2018-09-09')}
        {this.renderBasicItem('活动成本', '10000', <RightSuffix>元</RightSuffix>)}
        {this.renderBasicItem('预期收入', '20000', <RightSuffix>元</RightSuffix>)}
        {this.renderBasicItem('邀请人数', '20')}
        {this.renderBasicItem('预期响应', '37')}
        <TitleItemComponent
          text="实际信息"
        />
        {this.renderBasicItem('实际人数', '2')}
        {this.renderBasicItem('实际成本', '300000', <RightSuffix>元</RightSuffix>)}
        {this.renderBasicItem('实际收入', '300000', <RightSuffix>元</RightSuffix>)}
        <TitleItemComponent
          text="其他信息"
        />
        {this.renderBasicItem('负责人', '张三')}
        {this.renderBasicItem('所属部门', '所属部门所属部门')}
        {this.renderBasicItem('创建人', '创建人创建人')}
        {this.renderBasicItem('创建时间', '2018-09-09 09:00')}
        {this.renderBasicItem('最近修改时间', '2018-09-09 09:00')}
        {this.renderBasicItem('最近跟进人', '张三')}
        {this.renderBasicItem('最近跟进时间', '2018-09-09 09:00', null, null, true)}
        <TitleItemComponent
          text="备注"
          color="#373737"
        />
        <RemarkView>
          <RemarkText>
            活动说明，活动说明，活动说明，活动说明，活动说明，活动说明，
          </RemarkText>
        </RemarkView>
      </ContainerView>
    );
  }
}

MarkActivityDetailsItem.defaultProps = {};

MarkActivityDetailsItem.propTypes = {};

export default MarkActivityDetailsItem;
