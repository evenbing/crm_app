/**
 * @component ActivityDetailsItem.js
 * @description 活动详情组件
 * @time 2018/9/1
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
        <TitleItemComponent
          text="基本信息"
        />
        {this.renderBasicItem('合同名称', '合同名称')}
        {this.renderBasicItem('客户', '西风网络')}
        {this.renderBasicItem('销售机会', '标准价格表')}
        {this.renderBasicItem('合同类型', '老客户机会')}
        {this.renderBasicItem('合同状态', '部分回款')}
        {this.renderBasicItem('付款方式', '现金')}
        {this.renderBasicItem('总金额', '120,000.00', <RightSuffix>元</RightSuffix>)}
        {this.renderBasicItem('开始日期', '2018-09-09')}
        {this.renderBasicItem('结束日期', '2018-09-09', null, null, true)}
        <TitleItemComponent
          text="回款信息"
        />
        {this.renderBasicItem('开票金额', '120,000.00', <RightSuffix>元</RightSuffix>)}
        {this.renderBasicItem('回款金额', '120,000.00', <RightSuffix>元</RightSuffix>)}
        {this.renderBasicItem('未回款金额', '120,000.00', <RightSuffix>元</RightSuffix>)}
        {this.renderBasicItem('回款状态', '部分回款')}
        {this.renderBasicItem('逾期状态', '已逾期')}
        {this.renderBasicItem('回款进度', '张三', null, null, true)}
        <TitleItemComponent
          text="其他信息"
        />
        {this.renderBasicItem('合同编号', '1234567890')}
        {this.renderBasicItem('签约日期', '2018-09-09 09:00')}
        {this.renderBasicItem('我方签约人', '张三张三')}
        {this.renderBasicItem('客户方签约人', '张三')}
        {this.renderBasicItem('合同正文', null, null, null, true)}
        <RemarkView>
          <RemarkText>
            合同正文，合同正文合同正文合同正文合同正文合同正文合同正文合同正文合同正文
          </RemarkText>
        </RemarkView>
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
