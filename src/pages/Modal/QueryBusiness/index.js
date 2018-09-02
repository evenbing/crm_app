/**
 * @component index.js
 * description 工商信息查询页面
 * @time 2018/8/16
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../../constants';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import { ContainerScrollView } from '../../../components/Styles/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import NavInputItem from '../../../components/NavInputItem';
import QueryHead from './components/QueryHead';

const ListView = styled.View`
  background: ${theme.whiteColor};
`;

const RightText = styled.Text`
  color: #AEAEAE;
  font-size: ${theme.moderateScale(16)};
  font-family: ${theme.fontRegular};
`;

const NavItemStyle = {
  leftWidth: theme.moderateScale(101),
  leftTextStyle: {
    color: '#373737',
  },
  showInput: false,
  height: 44,
};

class QueryBusiness extends React.Component {
  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
  }
  onPressRight = () => alert('finish');
  render() {
    // const {
    //   navigation: { navigate },
    // } = this.props;
    return (
      <ContainerScrollView
        bottomPadding
      >
        <CommStatusBar />
        <QueryHead />
        <ListView>
          <NavInputItem
            leftText="公司类型"
            right={
              <RightText>有限责任公司</RightText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="行业"
            right={
              <RightText>软件和信息技术服务业</RightText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="经营范围"
            right={
              <RightText
                style={{
                  alignSelf: 'flex-start',
                  marginTop: theme.moderateScale(11),
                  height: '100%',
                  width: theme.moderateScale(236),
                }}
              >
                智能科技、电子科技领域内的技术开发、技术咨询、技术转让、技术服务；
              </RightText>
            }
            {...NavItemStyle}
            leftTextStyle={{
              alignSelf: 'flex-start',
              marginTop: theme.moderateScale(11),
            }}
            height={89}
          />
          <NavInputItem
            leftText="注册地址"
            right={
              <RightText
                style={{
                  alignSelf: 'flex-start',
                  marginTop: theme.moderateScale(11),
                  height: '100%',
                  width: theme.moderateScale(236),
                }}
              >
                江苏省苏州市高新区特别牛的高新创业产业园竹园路209号
              </RightText>
            }
            {...NavItemStyle}
            leftTextStyle={{
              alignSelf: 'flex-start',
              marginTop: theme.moderateScale(11),
            }}
            height={66}
          />
          <NavInputItem
            leftText="电话"
            center={null}
            right={
              <RightText>0514-12345678</RightText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="邮件"
            center={null}
            right={
              <RightText>zhangsan@xifengwangluo.com</RightText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="微博"
            center={null}
            right={
              <RightText>zhangsan@xifengwangluo.com</RightText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="网址"
            center={null}
            right={
              <RightText>www.xifengwangluo.com</RightText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="邮编"
            center={null}
            right={
              <RightText>邮编</RightText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="办公地址"
            right={
              <RightText
                style={{
                  alignSelf: 'flex-start',
                  marginTop: theme.moderateScale(11),
                  height: '100%',
                  width: theme.moderateScale(236),
                }}
              >
                江苏省苏州市高新区特别牛的高新创业产业园竹园路209号
              </RightText>
            }
            {...NavItemStyle}
            leftTextStyle={{
              alignSelf: 'flex-start',
              marginTop: theme.moderateScale(11),
            }}
            height={66}
          />
          <NavInputItem
            leftText="法人"
            center={null}
            right={
              <RightText>张三</RightText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="联系电话"
            center={null}
            right={
              <RightText>2017-10-10 10:00</RightText>
            }
            {...NavItemStyle}
          />
        </ListView>
        <HorizontalDivider
          height={30}
        />
      </ContainerScrollView>
    );
  }
}

QueryBusiness.navigationOptions = ({ navigation, screenProps }) => ({
  title: '工商信息查询',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
  headerRight: (
    <RightView
      onPress={navigation.state.params ? navigation.state.params.onPressRight : null}
      right="回填"
      rightStyle={{
        color: theme.primaryColor,
      }}
    />
  ),
});

QueryBusiness.defaultProps = {};

QueryBusiness.propTypes = {
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

export default QueryBusiness;
