/**
 * @component CreateSalesClue.js
 * @description 新增线索页面
 * @time 2018/8/15
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme, routers } from '../../../constants';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import { ContainerScrollView } from '../../../components/Styles/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import TitleItem from '../../../components/Details/TitleItem';
import NavInputItem from '../../../components/NavInputItem';
// import ScanCard from '../../../components/Create/ScanCard';
import CreateMoreButton from '../../../components/Create/CreateMoreButton';


const ListView = styled.View`
  background: ${theme.whiteColor};
`;

const CenterText = styled.Text`
  font-size: ${theme.moderateScale(16)};
  color: #AEAEAE;
  font-family: ${theme.fontRegular};
`;

const NavItemStyle = {
  leftWidth: theme.moderateScale(83),
  height: 44,
  showNavIcon: true,
};

class CreateSalesClue extends React.Component {
  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
  }
  onPressRight = () => alert('finish');
  render() {
    const {
      navigation: {
        navigate,
      },
    } = this.props;
    return (
      <ContainerScrollView
        bottomPadding
      >
        <CommStatusBar />
        {/* <ScanCard
          onPress={() => alert(1)}
        /> */}
        <TitleItem
          text="必填信息"
          fontSize={16}
        />
        <ListView>
          <NavInputItem
            leftText="姓名"
            inputProps={{
              'placeholder': '请输入姓名',
              fontSize: theme.moderateScale(16),
            }}
            leftTextStyle={{
              color: '#373737',
              width: theme.moderateScale(80),
            }}
            height={44}
          />
          <NavInputItem
            leftText="公司名称"
            inputProps={{
              'placeholder': '请输入公司名称',
              fontSize: theme.moderateScale(16),
            }}
            leftTextStyle={{
              color: '#373737',
              width: theme.moderateScale(80),
            }}
            height={44}
          />
          <NavInputItem
            leftText="市场活动"
            center={
              <CenterText>请选择市场活动</CenterText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="所属部门"
            center={
              <CenterText>请选择所属部门</CenterText>
            }
            {...NavItemStyle}
          />
        </ListView>
        <HorizontalDivider
          height={41}
        />
        <CreateMoreButton
          onPress={() => navigate(routers.createSalesClueMore)}
        />
      </ContainerScrollView>
    );
  }
}

CreateSalesClue.navigationOptions = ({ navigation }) => ({
  title: '新增线索',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
  headerRight: (
    <RightView
      onPress={navigation.state.params ? navigation.state.params.onPressRight : null}
      right="完成"
      rightStyle={{
        color: theme.primaryColor,
      }}
    />
  ),
});

CreateSalesClue.defaultProps = {};

CreateSalesClue.propTypes = {
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

export default CreateSalesClue;
