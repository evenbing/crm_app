import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { moderateScale } from '../../../utils/scale';
import OperateIconImage from '../../../img/home/ico_operate_icon.png';
import { theme } from '../../../constants';
import { HorizontalDivider } from '../../../components/Styles/Divider';

const Divder = styled.View`
  width: ${moderateScale(1)}px;
  height: ${moderateScale(39)}px;
  background-color: ${theme.pageBackColor};
`;

const Container = styled.View``;

const Up = styled.TouchableOpacity`
  background-color: ${theme.whiteColor};;
  padding: ${moderateScale(15)}px 0px;
  flex-direction: row;
  align-items: center;
`;

const Lace = styled.View`
    width: ${moderateScale(4)};
    height: ${moderateScale(48)};
    background-color: #26B34E;
    margin-right: ${moderateScale(15)};
  `;

const TimeView = styled.View`
  align-items: center;
  padding-top: ${moderateScale(10)}px;
  margin-right: ${moderateScale(9)}px;
`;

const Duration = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: #26B34E;
  font-size: ${moderateScale(18)};
`;

const Type = styled.Text.attrs({
  numberOfLines: 1,
})`
    height: ${moderateScale(17)}px;
    color: grey;
    font-size: ${moderateScale(12)}px;
    line-height: ${moderateScale(17)}px;
  `;

const Theme = styled.View`
    flex: 1;
    padding-top: ${moderateScale(10)}px;
    margin-left: ${moderateScale(8)}px;
  `;

const Title = styled.Text.attrs({
  numberOfLines: 1,
})`
    color: black;
    font-size: ${moderateScale(18)};
  `;

const Time = styled.Text.attrs({
  numberOfLines: 1,
})`
    height: ${moderateScale(17)}px;
    color: grey;
    font-size: ${moderateScale(12)}px;
    line-height: ${moderateScale(17)}px;
  `;

const Operate = styled.View`
  align-items: center;
  padding: 0px ${moderateScale(12)}px;
`;

const OperateIcon = styled.Image.attrs({
  source: OperateIconImage,
})`
  width: ${moderateScale(22)};
  height: ${moderateScale(22)};
`;

const OperateView = styled.View`
  height: ${props => props.showOperateView ? moderateScale(37) : '0px'};
  background-color: ${theme.whiteColor};
`;

const OperateItemView = styled.View`
  flex-direction: row;
  background-color: ${theme.whiteColor};
`;

const OperateItem = styled.TouchableOpacity`
  flex: 1;
  height: ${moderateScale(36)};
  justify-content: center;
  align-items: center;
`;

const OperateText = styled.Text`
  font-size: ${moderateScale(16)};
  color: #26B34E;
`;

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOperateView: false,
    };
  }

  onToggleOperateView = () => {
    this.setState({ showOperateView: !this.state.showOperateView });
  }

  render() {
    const {
      duration,
      type,
      title,
      time,
      operateList = [],
    } = this.props;
    const { showOperateView } = this.state;
    return (
      <Container>
        <Up onPress={this.onToggleOperateView}>
          <Lace />
          <TimeView>
            <Duration>{duration}</Duration>
            <Type>{type}</Type>
          </TimeView>
          <Divder />
          <Theme>
            <Title>{title}</Title>
            <Time>{time}</Time>
          </Theme>
          <Divder />
          <Operate>
            <OperateIcon />
          </Operate>
        </Up>
        <OperateView showOperateView={showOperateView}>
          <HorizontalDivider height={moderateScale(1)} />
          <OperateItemView>
            {operateList.map((item) => {
              const {
                key,
                text,
                onPress,
              } = item;
              return (
                <OperateItem onPress={onPress} key={key}>
                  <OperateText>{text}</OperateText>
                </OperateItem>
              );
            })}
          </OperateItemView>
        </OperateView>
      </Container>
    );
  }
}

ListItem.propTypes = {
  duration: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  operateList: PropTypes.arrayOf(PropTypes.oneOf([
    PropTypes.object,
  ])).isRequired,
};

export default ListItem;
