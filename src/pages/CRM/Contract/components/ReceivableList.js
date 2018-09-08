import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { moderateScale } from '../../../../utils/scale';
import { theme } from '../../../../constants';
import rightArrow from '../../../../img/home/ico_right_arrow.png';
import { HorizontalDivider } from '../../../../components/Styles/Divider';

const SectionList = styled.SectionList`
  background-color: ${theme.pageBackColor};
`;

const ListHeaderView = styled.View`
  height: ${moderateScale(44)}px;
  padding: 0px ${moderateScale(15)}px;
  background-color: ${theme.whiteColor};
`;

const ListHeaderText = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: ${theme.textColor};
  font-size: ${moderateScale(16)}px;
  height: ${moderateScale(43)}px;
  line-height: ${moderateScale(43)}px;
`;

const ListDataView = styled.View`
  flex-direction: row;
  align-items: center;
  height: ${moderateScale(44)}px;
  padding: 0px ${moderateScale(15)}px;
  background-color: ${theme.whiteColor};
`;

const TypeText = styled.Text`
  font-size: ${moderateScale(16)}px;
  color: ${theme.textColor};
`;

const MiddleView = styled.View`
  flex: 1;
  flex-direction: row;
`;

const TimeText = styled.Text`
  font-size: ${moderateScale(16)}px;
  color: ${theme.textPlaceholderColor};
  margin-left: ${moderateScale(20)}px;
  margin-right: ${moderateScale(10)}px;
`;

const AmountText = styled.Text`
  font-size: ${moderateScale(16)}px;
  color: ${theme.textPlaceholderColor};
`;

const RightView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StatusText = styled.Text`
  font-size: ${moderateScale(14)}px;
  color: ${theme.primaryColor};
`;

const NavIcon = styled.Image.attrs({
  source: rightArrow,
})`
  width: ${moderateScale(6)}px;
  height: ${moderateScale(11)}px;
`;

const HorizontalDividerView = styled.View`
  padding: 0px ${moderateScale(15)}px;
`;

class ReceivableList extends Component {
  constructor(props) {
    super(props);
  }

  renderSectionFooter = () => <HorizontalDivider height={moderateScale(11)} />

  renderItemSeparatorComponent = () => (
    <HorizontalDividerView>
      <HorizontalDivider height={moderateScale(1)} />
    </HorizontalDividerView>
  )

  renderSectionHeader = ({ section: { title } }) => {
    return (
      <ListHeaderView>
        <ListHeaderText> {title} </ListHeaderText>
        <HorizontalDivider height={moderateScale(1)} />
      </ListHeaderView>
    );
  }

  renderItem = ({ item }) => {
    const {
      type,
      time,
      amount,
      status,
    } = item;
    return (
      <ListDataView>
        <TypeText> {type} </TypeText>
        <MiddleView>
          <TimeText> {time} </TimeText>
          <AmountText> {amount} </AmountText>
        </MiddleView>
        <RightView>
          <StatusText> {status} </StatusText>
          <NavIcon />
        </RightView>
      </ListDataView>
    );
  }

  render() {
    const { data } = this.props;
    return (
      <SectionList
        renderSectionHeader={this.renderSectionHeader}
        renderSectionFooter={this.renderSectionFooter}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.renderItemSeparatorComponent}
        keyExtractor={item => item.key}
        sections={data}
      />
    );
  }
}

ReceivableList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.array,
    title: PropTypes.string,
  })).isRequired,
};

export default ReceivableList;
