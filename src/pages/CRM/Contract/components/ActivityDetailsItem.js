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

// 回款状态
function getReceivablePriceStatus({ receivableDetailTotalPrice = 0, unreceivableTotalPrice = 0 }) {
  if (receivableDetailTotalPrice > 0 && unreceivableTotalPrice > 0) return '部分回款';
  if (receivableDetailTotalPrice === 0) return '未回款';
  if (unreceivableTotalPrice === 0) return '已回款';
  return null;
}

// 逾期状态
function getDateTimeStatus(item) {
  const { endDate } = item;
  const nowTime = new Date().getTime();
  const res = getReceivablePriceStatus(item);
  if (nowTime < endDate) return '未逾期';
  if (nowTime >= endDate && res == null) return null;
  if (nowTime >= endDate && res !== '已回款') return '已逾期';
  return '未逾期';
}

// 回款进度
function getReceivableRoate({ totalMoney, receivableDetailTotalPrice }) {
  if (!totalMoney || totalMoney === 0 || receivableDetailTotalPrice === 0) return '0%';
  return `${(receivableDetailTotalPrice / totalMoney).toFixed(4) * 100}%`;
}

const ActivityDetailsItem = ({ item }) => (
  <ContainerView>
    <TitleItemComponent
      text="基本信息"
    />
    {renderBasicItem('合同名称', item.theme)}
    {renderBasicItem('客户', item.customerName)}
    {renderBasicItem('销售机会', item.salesleadName)}
    {renderBasicItem('合同类型', PackType[item.type])}
    {renderBasicItem('合同状态', PackStatus[item.status])}
    {renderBasicItem('付款方式', PayType[item.payType])}
    {renderBasicItem('总金额', item.totalMoney, <RightSuffix>元</RightSuffix>)}
    {renderBasicItem('开始日期', formatDateByMoment(item.startDate, 'YYYY-MM-DD'))}
    {renderBasicItem('结束日期', formatDateByMoment(item.endDate, 'YYYY-MM-DD'), null, null, true)}
    <TitleItemComponent
      text="回款信息"
    />
    {renderBasicItem('开票金额', item.invoiceDetailTotalPrice, <RightSuffix>元</RightSuffix>)}
    {renderBasicItem('回款金额', item.receivableDetailTotalPrice, <RightSuffix>元</RightSuffix>)}
    {renderBasicItem('未回款金额', item.unreceivableTotalPrice, <RightSuffix>元</RightSuffix>)}
    {renderBasicItem('回款状态', getReceivablePriceStatus(item))}
    {renderBasicItem('逾期状态', getDateTimeStatus(item))}
    {renderBasicItem('回款进度', getReceivableRoate(item), null, null, true)}
    <TitleItemComponent
      text="其他信息"
    />
    {renderBasicItem('合同编号', item.number)}
    {renderBasicItem('签约日期', formatDateByMoment(item.pactDate, 'YYYY-MM-DD'))}
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
      fontSize={16}
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
