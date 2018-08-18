import React, { Component } from 'react';
import styled from 'styled-components';
import { moderateScale } from '../../../utils/scale';
import OperateIconImage from '../../../img/home/ico_operate_icon.png';

const Divder = styled.View`
  width: ${moderateScale(0.8)};
  height: ${moderateScale(48)};
  background-color: #F6F6F6;
  margin: 0px ${moderateScale(10)}px;
`;

const Container = styled.View``;

const Up = styled.View`
  background-color: white;
  padding: ${moderateScale(15)}px 0px;
  flex-direction: row;
`;

const Lace = styled.View`
    width: ${moderateScale(4)};
    height: ${moderateScale(48)};
    background-color: #26B34E;
    margin-right: ${moderateScale(15)};
  `;

const TimeView = styled.View`
    align-items: center;
    padding-top: ${moderateScale(10)};
  `;

const Duration = styled.Text`
    color: #26B34E;
    font-size: ${moderateScale(18)};
  `;

const Type = styled.Text`
    color: grey;
    font-size: ${moderateScale(13)};
  `;

const Theme = styled.View`
    flex: 1;
    padding-top: ${moderateScale(10)};
  `;

const Title = styled.Text`
    color: black;
    font-size: ${moderateScale(18)};
  `;

const Time = styled.Text`
    color: grey;
    font-size: ${moderateScale(13)};
  `;

const Operate = styled.TouchableOpacity`
    padding-top: ${moderateScale(10)};
  `;

const OperateIcon = styled.Image.attrs({
  source: OperateIconImage,
})`
    width: ${moderateScale(22)};
    height: ${moderateScale(22)};
  `;

const OperateView = styled.View`
  height: ${props => props.showOperateView ? moderateScale(36) : '0px'};
  border-top-width: ${moderateScale(1)};
  border-top-color: #F6F6F6;
  flex-direction: row;
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
        <Up>
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
          <Operate onPress={this.onToggleOperateView}>
            <OperateIcon />
          </Operate>
        </Up>
        <OperateView showOperateView={showOperateView}>
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
        </OperateView>
      </Container>
    );
  }
}
export default ListItem;
