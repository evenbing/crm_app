/**
 * @component BoardList.jsx
 * @description 看板组件
 * @time 2018/8/11
 * @author JUSTIN XU
 */
import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

// components
import Accordion from '../../../../components/Accordion';
import ListItem from '../../../../components/Customer/ListItem';
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
    } = this;
    const ListItemProps = {
      containerStyle: {
        height: theme.moderateScale(85),
        backgroundColor: theme.pageBackColor,
      },
      titleStyle: {
        marginBottom: theme.moderateScale(5),
      },
      item: {
        title: '筹备新系统上线',
        tipList: [
          '客户名称：西风网络 ',
          '销售金额：¥ 2000,000,000.00',
        ],
      },
      right: 'hidden',
    };
    return (
      <ContainerView>
        <Accordion
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
        </Accordion>
      </ContainerView>
    );
  }
}

BoardList.defaultProps = {};

BoardList.propTypes = {};

export default BoardList;
