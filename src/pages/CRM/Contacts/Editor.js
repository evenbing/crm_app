/**
 * @component Editor.js
 * @description 编辑资料页面
 * @time 2018/8/13
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../../../constants/theme';
import { moderateScale } from '../../../utils/scale';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import { ContainerView } from '../../../components/Styles/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import TitleItem from '../../../components/Details/TitleItem';
import NavInputItem from '../../../components/NavInputItem';
import Thumbnail from '../../../components/Thumbnail';
import TouchableView from '../../../components/TouchableView';

const ListView = styled.View`
  background: ${theme.whiteColor};
  margin-top: ${moderateScale(10)};
`;

const RightTet = styled.Text`
  font-size: ${moderateScale(16)};
  color: #AEAEAE;
  font-family: ${theme.fontRegular};
`;

const FooterView = styled.View`
  height: ${moderateScale(49)};
  padding: 0 ${moderateScale(15)}px;
`;

const FooterButtonView = styled(TouchableView)`
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid ${theme.primaryColor};
  border-radius: ${moderateScale(4)};
`;

const FooterText = styled.Text`
  margin-left: ${moderateScale(10)};
  font-size: ${moderateScale(16)};
  color: ${theme.primaryColor};
`;

const NavItemStyle = {
  leftWidth: moderateScale(83),
  height: 44,
  showNavIcon: true,
};

class Editor extends React.Component {
  render() {
    return (
      <ContainerView
        bottomPadding
      >
        <CommStatusBar />
        <HorizontalDivider height={9} />
        <TitleItem text="必填信息" />
        <ListView>
          <NavInputItem
            leftText="活动名称"
            inputProps={{
              'placeholder': '请输入活动名称',
              fontSize: moderateScale(16),
            }}
            leftTextStyle={{
              color: '#373737',
              width: moderateScale(80),
            }}
            height={44}
          />
          <NavInputItem
            leftText="开始日期"
            right={
              <RightTet>请选择活动开始日期</RightTet>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="结束日期"
            right={
              <RightTet>2017-09-09</RightTet>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="所属部门"
            right={
              <RightTet>请选择所属部门</RightTet>
            }
            {...NavItemStyle}
          />
        </ListView>
        <HorizontalDivider height={41} />
        <FooterView>
          <FooterButtonView
            onPress={() => alert(1)}
          >
            <Thumbnail
              size={19}
            />
            <FooterText>添加更多信息</FooterText>
          </FooterButtonView>
        </FooterView>
      </ContainerView>
    );
  }
}

Editor.navigationOptions = ({ navigation, screenProps }) => ({
  title: '编辑资料',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
  headerRight: (
    <RightView
      onPress={navigation.state.params ? navigation.state.params.onPressRight : null}
      right="完成"
    />
  ),
});

Editor.defaultProps = {};

Editor.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    goBack: PropTypes.func,
    navigate: PropTypes.func,
    setParams: PropTypes.func,
    state: PropTypes.shape({
      key: PropTypes.string,
      routeName: PropTypes.string,
      params: PropTypes.object,
    }),
  }).isRequired,
};

export default Editor;
