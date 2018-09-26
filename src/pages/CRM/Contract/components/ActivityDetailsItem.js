/**
 * @component ActivityDetailsItem.js
 * @description 活动详情组件
 * @time 2018/9/1
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../../../constants';
import { PayType, PackType, PackStatus } from '../../../../constants/enum';
import { formatDateByMoment } from '../../../../utils/base';

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
      leftText={leftText || '--'}
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
    const {
      item,
    } = this.props;
    return (
      <ContainerView>
        <TitleItemComponent
          text="基本信息"
        />
        {this.renderBasicItem('合同名称', item.theme)}
        {this.renderBasicItem('客户', item.customerName)}
        {this.renderBasicItem('销售机会', item.salesOpportunitiesId)}
        {this.renderBasicItem('合同类型', PackType[item.type])}
        {this.renderBasicItem('合同状态', PackStatus[item.status])}
        {this.renderBasicItem('付款方式', PayType[item.payType])}
        {this.renderBasicItem('总金额', item.totalMoney, <RightSuffix>元</RightSuffix>)}
        {this.renderBasicItem('开始日期', formatDateByMoment(item.startDate))}
        {this.renderBasicItem('结束日期', formatDateByMoment(item.endDate), null, null, true)}
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
        {this.renderBasicItem('合同编号', item.number)}
        {this.renderBasicItem('签约日期', formatDateByMoment(item.pactDate))}
        {this.renderBasicItem('我方签约人', item.ourContractName)}
        {this.renderBasicItem('客户方签约人', item.customerContractName)}
        {this.renderBasicItem('合同正文', null, null, null, true)}
        <RemarkView>
          <RemarkText>
            {item.content}
          </RemarkText>
        </RemarkView>
        <TitleItemComponent
          text="备注"
          color="#373737"
        />
        <RemarkView>
          <RemarkText>
            {item.comment}
          </RemarkText>
        </RemarkView>
      </ContainerView>
    );
  }
}

ActivityDetailsItem.defaultProps = {
  item: {},
};

ActivityDetailsItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
};

export default ActivityDetailsItem;
