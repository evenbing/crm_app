/**
 * @component ActivityDetailsItem.js
 * @description 活动详情组件
 * @time 2018/9/2
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
  font-size: ${theme.moderateScale(16)};
  color: #AEAEAE;
`;

class ActivityDetailsItem extends React.PureComponent {
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
        {this.renderBasicItem('回款期次', '4')}
        {this.renderBasicItem('计划回款金额', '120,000.00', <RightSuffix>元</RightSuffix>)}
        {this.renderBasicItem('计划回款日期', '2018-09-09')}
        {this.renderBasicItem('负责人', '张三')}
        {this.renderBasicItem('合同', '西风网络合同')}
        {this.renderBasicItem('客户名称', '西风网络')}
        {this.renderBasicItem('实际回款金额', '120,000.00', <RightSuffix>元</RightSuffix>)}
        {this.renderBasicItem('本期回款状态', '未完成')}
        {this.renderBasicItem('本期逾期状态', '已逾期')}
        {this.renderBasicItem('所属部门', '市场部')}
        {this.renderBasicItem('负责人', '张三')}
        {this.renderBasicItem('创建人', '张三')}
        {this.renderBasicItem('创建时间', '2018-09-09')}
        {this.renderBasicItem('最近修改人', '张三')}
        {this.renderBasicItem('最近时间', '2018-09-01')}
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

ActivityDetailsItem.defaultProps = {};

ActivityDetailsItem.propTypes = {};

export default ActivityDetailsItem;
