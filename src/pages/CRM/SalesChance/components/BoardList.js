/**
 * @component BoardList.jsx
 * @description 看板组件
 * @time 2018/8/11
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// components
import Accordion from '../../../../components/Accordion';
import ListItem from '../../../../components/SwipeList/ListItem';
import theme from '../../../../constants/theme';

const ContainerView = styled.View``;

class BoardList extends React.Component {
  state = {
    activeIndex: 0,
  };
  onPressHeader = (index) => {
    this.setState({ activeIndex: index });
  };
  render() {
    const {
      state: {
        activeIndex,
      },
      props: {
        data,
        salesPhases,
      },
    } = this;
    const dataList = [];
    if (data.length > 0) {
      for (let i = 0; i < salesPhases.length; i++) {
        const { id, name } = salesPhases[i];
        const spList = data.filter(item => item.salesPhaseId === id);
        
        if (spList.length <= 0) continue;
        const rate = ((spList.length / data.length) * 100).toFixed(1);
        const left = `${name}(${rate}%)`;
        let totalAmount = 0;
        const ListItemPropsList = spList.map(({
          id,
          customerName,
          name,
          planAmount,
        }) => {
          totalAmount += planAmount;
          return ({
            id,
            ListItemProps: {
              containerStyle: {
                height: theme.moderateScale(85),
                backgroundColor: theme.pageBackColor,
              },
              titleStyle: {
                marginBottom: theme.moderateScale(5),
              },
              item: {
                title: name,
                tipList: [
                  `客户名称：${customerName}`,
                  `销售金额：¥ ${planAmount}`,
                ],
              },
              right: 'hidden',
            },
          });
        });
        const right = `${totalAmount}/${spList.length}个`;
        dataList.push({
          id,
          left,
          right,
          ListItemPropsList,
        });
      }
    }
    return (
      <ContainerView>
        {
          dataList.map(({ 
            id,
            left,
            right,
            ListItemPropsList, 
          }, index) => {
            return (
              <Accordion
                key={id}
                left={left}
                right={right}
                showMain={activeIndex === index}
                onPress={() => this.onPressHeader(index)}
              >
                { ListItemPropsList.map(({ id, ListItemProps }) => (<ListItem key={id} {...ListItemProps} />)) }
              </Accordion>
            );
          })
        }
        {/* <Accordion
          left="需求确定 (30%)"
          right="20,000,000.00/1个"
          showMain={activeIndex === 0}
          onPress={() => this.onPressHeader(0)}
        >
          <ListItem {...ListItemProps} />
        </Accordion>
        <Accordion
          left="初步接洽 (10%)"
          right="0.00/0个"
          showMain={activeIndex === 1}
          onPress={() => this.onPressHeader(1)}
        >
          <ListItem {...ListItemProps} />
        </Accordion>
        <Accordion
          left="方案报价 (60%)"
          right="0.00/0个"
          showMain={activeIndex === 2}
          onPress={() => this.onPressHeader(2)}
        >
          <ListItem {...ListItemProps} />
        </Accordion>
        <Accordion
          left="谈判审核 (10%)"
          right="0.00/0个"
          showMain={activeIndex === 3}
          onPress={() => this.onPressHeader(3)}
        >
          <ListItem {...ListItemProps} />
        </Accordion> */}
      </ContainerView>
    );
  }
}

BoardList.defaultProps = {
  data: [],
  salesPhases: [],
};

BoardList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    class: PropTypes.string,
    creationTime: PropTypes.string,
    customerId: PropTypes.string,
    customerName: PropTypes.string,
    departmentId: PropTypes.string,
    expectedDate: PropTypes.string,
    follow: PropTypes.bool,
    id: PropTypes.string,
    inActive: PropTypes.bool,
    name: PropTypes.string,
    planAmount: PropTypes.number,
    rate: PropTypes.number,
    rowVersion: PropTypes.string,
    salesPhaseId: PropTypes.string,
    salesPhaseName: PropTypes.string,
    tenantId: PropTypes.string,
  })),
  salesPhases: PropTypes.arrayOf(PropTypes.shape({
    class: PropTypes.string,
    id: PropTypes.string,
    isActive: PropTypes.bool,
    name: PropTypes.string,
    orderIndex: PropTypes.number,
    rowVersion: PropTypes.string,
    tenantId: PropTypes.string,
  })),
};

export default BoardList;
