/**
 * @component ActivityDetailsItem.js
 * @description 活动详情组件
 * @time 2018/9/2
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { formatDateByMoment } from '../../../../utils/base';

// components
import TitleItemComponent from '../../../../components/Details/TitleItem';
import { renderBasicItem, RemarkView, RemarkText, RightSuffix } from '../../../../components/Details/Styles';

const ContainerView = styled.View``;

const ActivityDetailsItem = ({
  item,
}) => (
  <ContainerView>
    {renderBasicItem('回款期次', '4')}
    {renderBasicItem('实际回款金额', item.receivablePrice, <RightSuffix>元</RightSuffix>)}
    {renderBasicItem('实际回款日期', formatDateByMoment(item.receivableDate))}
    {renderBasicItem('负责人', item.ownerUserName)}
    {renderBasicItem('合同', '西风网络合同')}
    {renderBasicItem('客户名称', '西风网络')}
    {renderBasicItem('付款方式', '现金')}
    {renderBasicItem('所属部门', '市场部')}
    {renderBasicItem('负责人', '张三')}
    {renderBasicItem('所属部门', '市场部')}
    {renderBasicItem('创建人', '张三')}
    {renderBasicItem('创建时间', '2018-09-09')}
    {renderBasicItem('最近修改人', '张三')}
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
