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
import { DataTitleTypes, PayType } from 'constants/enum';

// utils
import { formatDateByMoment, formatDateType } from 'utils/base';


// components
import TitleItemComponent from 'components/Details/TitleItem';
import { renderBasicItem, RemarkView, RemarkText, RightSuffix } from 'components/Details/Styles';

const ContainerView = styled.View``;

const ActivityDetailsItem = ({
  item,
}) => (
  <ContainerView>
    {
      renderBasicItem('回款期次', typeof item.issueNumber !== 'undefined' ?
        DataTitleTypes[item.issueNumber - 1] : null)
    }
    {renderBasicItem('实际回款金额', item.receivablePrice, <RightSuffix>元</RightSuffix>)}
    {renderBasicItem('实际回款日期', formatDateByMoment(item.receivableDate, formatDateType))}
    {renderBasicItem('负责人', item.ownerUserName)}
    {renderBasicItem('合同', item.pactName)}
    {renderBasicItem('客户名称', item.customerName)}
    {renderBasicItem('付款方式', item.payType ? PayType[item.payType] : null)}
    {renderBasicItem('负责人', item.ownerUserName)}
    {renderBasicItem('所属部门', item.departmentName)}
    {renderBasicItem('创建人', item.createdByName)}
    {renderBasicItem('创建时间', formatDateByMoment(item.creationTime, formatDateType))}
    {renderBasicItem('最近修改人', item.lastUpdatedByName)}
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
