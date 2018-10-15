/**
 * @component ActivityDetailsItem.js
 * @description 活动详情组件
 * @time 2018/8/13
 * @author JUSTIN XU
 */
import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { observer } from 'mobx-react/native';

import { theme } from '../../../../constants';
// components
import NavItemComponent from '../../../../components/NavItem';
import TitleItemComponent from '../../../../components/Details/TitleItem';
import { OpportunityTypes, OpportunitySource } from '../../../../constants/enum';
import { formatDateByMoment } from '../../../../utils/base';
import ProductItem from './ProductItem';
import BusinessStore from '../../../../logicStores/business';

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

const formatDateTypeShow = 'YYYY-MM-DD HH:mm';
const renderBasicItem = (leftText, rightText, rightSuffix, rightStyle = {}, isLast = false) => (
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

@observer
class ActivityDetailsItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props,
      budinessProducts: [],
    };
  }

  componentDidMount() {
    BusinessStore.getBusinessDetailReq({
      opportunityId: this.state.id,
    }, (budinessProducts) => {
      this.setState({
        budinessProducts,
      });
    });
  }

  render() {
    const {
      activityName,
      actualCost, // 257
      budgetCost, // 258
      customerName, // "ggbb"
      departmentName, // "测试pos机结算"
      expectedDate, // "1540915200000"
      name, // "ttttttttttttttttt"
      opportunityType, // "OLD_CUSTOMER"
      planAmount, // 2588
      sourceType, // "SALES_OPPORTUNITY__INTRODUCTION"
      getDetailItem,
      discription,
      budinessProducts,
    } = this.state;
    const opportunityTypeName = OpportunityTypes[opportunityType];
    const sourceTypeName = OpportunitySource[sourceType];
    const expectedDateShow = formatDateByMoment(expectedDate, formatDateTypeShow);
    getDetailItem({
      ...this.props,
      budinessProducts,
      opportunityTypeName,
      sourceTypeName,
      expectedDateShow,
    });
    return (
      <ContainerView>
        <TitleItemComponent
          text="基本信息"
        />
        {renderBasicItem('机会名称', name)}
        {renderBasicItem('客户', customerName)}
        {renderBasicItem('价格表', '价格表')}
        {renderBasicItem('机会类型', opportunityTypeName)}
        {renderBasicItem('销售金额', planAmount, <RightSuffix>元</RightSuffix>)}
        {renderBasicItem('来源', sourceTypeName)}
        {renderBasicItem('市场活动', activityName)}
        {renderBasicItem('结单日期', expectedDateShow)}
        {renderBasicItem('项目预算', budgetCost, <RightSuffix>元</RightSuffix>)}
        {renderBasicItem('实际花费', actualCost, <RightSuffix>元</RightSuffix>)}
        <TitleItemComponent
          text="其他信息"
        />
        {renderBasicItem('所属部门', departmentName)}
        <TitleItemComponent
          text="备注"
          color="#373737"
        />
        <RemarkView>
          <RemarkText>
            {discription}
          </RemarkText>
        </RemarkView>
        {
          budinessProducts.map(item => (
            <ProductItem
              key={item.id}
              {...item}
              onPress={() => {}}
            />
          ))
        }
      </ContainerView>
    );
  }
}


ActivityDetailsItem.defaultProps = {};

ActivityDetailsItem.propTypes = {};

export default ActivityDetailsItem;
