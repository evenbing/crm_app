import React, { Component } from 'react';
import styled from 'styled-components';
import { moderateScale, width } from '../../../utils/scale';
import theme from '../../../constants/theme';
import LeftArrow from '../../../img/home/ico_left_arrow.png';
import RightArrow from '../../../img/home/ico_right_arrow.png';
import CreateIcon from '../../../img/home/create.png';


const Container = styled.View`
  margin: -${moderateScale(30)}px ${moderateScale(15)}px 0px ${moderateScale(15)}px;
  background-color: ${theme.whiteColor};
  height: ${moderateScale(126)};
  border-radius: ${moderateScale(4)};
  padding: ${moderateScale(18)}px ${moderateScale(15)}px ${moderateScale(17)}px ${moderateScale(15)}px;
`;

const UpView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const UpLeftView = styled.View`
  /* width: ${moderateScale((width - 30 - 30 - 2) / 3)}px; */
  flex: 1;
  height: ${moderateScale(26)}px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const YearButton = styled.TouchableOpacity`
  padding: ${moderateScale(5)}px;
`;

const YearText = styled.Text`
  font-size: ${moderateScale(14)}px;
  color: ${theme.primaryColor};
`;

const UpMiddleView = styled.View`
  /* width: ${moderateScale((width - 30 - 30 - 2) / 3)}px; */
  flex: 1;
  height: ${moderateScale(26)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const MonthArrow = styled.TouchableOpacity`
  padding:${moderateScale(5)}px;
`;

const MonthArrowIcon = styled.Image`
  height: ${moderateScale(13.8)}px;
  width: ${moderateScale(8.5)}px;
`;

const MonthText = styled.Text`
  font-size: ${moderateScale(16)}px;
  color: ${theme.textColor};
`;

const UpRightView = styled.View`
  /* width: ${moderateScale((width - 30 - 30 - 2) / 3)}px; */
  flex: 1;
  height: ${moderateScale(26)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TodayButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: ${moderateScale(24)}px;
  height: ${moderateScale(24)}px;
  background-color: ${theme.primaryColor};
  border-radius: ${moderateScale(12)}px;
  margin-left: ${moderateScale(20.4)}px;
`;

const TodayButtonText = styled.Text`
  font-size: ${moderateScale(14)}px;
  color: ${theme.whiteColor};
`;


const CreateButton = styled.TouchableOpacity``;

const CreateButtonIcon = styled.Image.attrs({
  source: CreateIcon,
})`
  width: ${moderateScale(21.2)};
  height: ${moderateScale(25.4)};
`;

const MiddleView = styled.View`
  flex-direction: row;
  background-color: ${theme.pageBackColor};
  border-radius: ${moderateScale(7.5)}px;
`;

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Container>
        <UpView>
          <UpLeftView>
            <YearButton>
              <YearText>2018年</YearText>
            </YearButton>
          </UpLeftView>
          <UpMiddleView>
            <MonthArrow>
              <MonthArrowIcon source={LeftArrow} />
            </MonthArrow>
            <MonthText>5</MonthText>
            <MonthArrow>
              <MonthArrowIcon source={RightArrow} />
            </MonthArrow>
          </UpMiddleView>
          <UpRightView>
            <TodayButton>
              <TodayButtonText>今</TodayButtonText>
            </TodayButton>
            <CreateButton>
              <CreateButtonIcon />
            </CreateButton>
          </UpRightView>
        </UpView>
        <MiddleView />
      </Container>
    );
  }
}

export default Calendar;
