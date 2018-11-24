/**
 * @component ActivityDetailsItem.js
 * @description 活动详情组件
 * @time 2018/9/2
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// constants
import { DataTitleTypes } from 'constants/enum';

// utils
import { formatDateByMoment, formatDateType } from 'utils/base';

// components
import TitleItemComponent from 'components/Details/TitleItem';
import { renderBasicItem, RemarkView, RemarkText, RightSuffix } from 'components/Details/Styles';

const ContainerView = styled.View``;

// 回款状态
export function getReceivablePriceStatus({ receivablePrice = 0, receivableFactPrice = 0 }) {
  if (receivableFactPrice < receivablePrice && receivablePrice > 0) return '部分回款';
  if (receivableFactPrice === 0) return '未回款';
  if (receivableFactPrice >= receivablePrice) return '已回款';
  return null;
}

// 逾期状态
export function getDateTimeStatus(item) {
  const { receivableDate: endDate } = item;
  const nowTime = new Date().getTime();
  const res = getReceivablePriceStatus(item);
  if (nowTime < endDate) return '未逾期';
  if (nowTime >= endDate && res == null) return null;
  if (nowTime >= endDate && res !== '已回款') return '已逾期';
  return '未逾期';
}

const ActivityDetailsItem = ({
  item,
}) => (
  <ContainerView>
    {
      renderBasicItem('回款期次', typeof item.issueNumber !== 'undefined' ?
      DataTitleTypes[item.issueNumber - 1] : null)
    }
    {renderBasicItem('计划回款金额', item.receivablePrice, <RightSuffix>元</RightSuffix>)}
    {renderBasicItem('计划回款日期', formatDateByMoment(item.receivableDate, formatDateType))}
    {renderBasicItem('负责人', item.ownerUserName)}
    {renderBasicItem('合同', item.pactName)}
    {renderBasicItem('客户名称', item.customerName)}
    {renderBasicItem('实际回款金额', item.receivableFactPrice, <RightSuffix>元</RightSuffix>)}
    {renderBasicItem('本期回款状态', getReceivablePriceStatus(item))}
    {renderBasicItem('本期逾期状态', getDateTimeStatus(item))}
    {renderBasicItem('负责人', item.ownerUserName)}
    {renderBasicItem('所属部门', item.departmentName)}
    {renderBasicItem('创建人', item.createdByName)}
    {renderBasicItem('创建时间', formatDateByMoment(item.creationTime))}
    {renderBasicItem('最近修改人', item.lastUpdatedByName)}
    {/* {renderBasicItem('最近时间', formatDateByMoment(item.lastUpdatedTime))} */}
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
