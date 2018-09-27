/**
 * @component ActivityDetailsItem.js
 * @description 活动详情组件
 * @time 2018/9/1
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PayType, PackType, PackStatus } from '../../../../constants/enum';
import { formatDateByMoment } from '../../../../utils/base';

// components
import TitleItemComponent from '../../../../components/Details/TitleItem';
import { renderBasicItem, RemarkView, RemarkText, RightSuffix } from '../../../../components/Details/Styles';

const ContainerView = styled.View``;

const ActivityDetailsItem = ({ item }) => (
  <ContainerView>
    <TitleItemComponent
      text="基本信息"
    />
    {renderBasicItem('合同名称', item.theme)}
    {renderBasicItem('客户', item.customerName)}
    {renderBasicItem('销售机会', item.salesOpportunitiesId)}
    {renderBasicItem('合同类型', PackType[item.type])}
    {renderBasicItem('合同状态', PackStatus[item.status])}
    {renderBasicItem('付款方式', PayType[item.payType])}
    {renderBasicItem('总金额', item.totalMoney, <RightSuffix>元</RightSuffix>)}
    {renderBasicItem('开始日期', formatDateByMoment(item.startDate))}
    {renderBasicItem('结束日期', formatDateByMoment(item.endDate), null, null, true)}
    <TitleItemComponent
      text="回款信息"
    />
    {renderBasicItem('开票金额', '120,000.00', <RightSuffix>元</RightSuffix>)}
    {renderBasicItem('回款金额', '120,000.00', <RightSuffix>元</RightSuffix>)}
    {renderBasicItem('未回款金额', '120,000.00', <RightSuffix>元</RightSuffix>)}
    {renderBasicItem('回款状态', '部分回款')}
    {renderBasicItem('逾期状态', '已逾期')}
    {renderBasicItem('回款进度', '张三', null, null, true)}
    <TitleItemComponent
      text="其他信息"
    />
    {renderBasicItem('合同编号', item.number)}
    {renderBasicItem('签约日期', formatDateByMoment(item.pactDate))}
    {renderBasicItem('我方签约人', item.ourContractName)}
    {renderBasicItem('客户方签约人', item.customerContractName)}
    {renderBasicItem('合同正文', null, null, null, true)}
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

ActivityDetailsItem.defaultProps = {
  item: {},
};

ActivityDetailsItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
};

export default ActivityDetailsItem;
