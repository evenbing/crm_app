import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useStrict } from 'mobx';
import { observer } from 'mobx-react/native';
import LinearGradient from 'react-native-linear-gradient';
import { CommStatusBar, TopRightView } from 'xn-react-native-applets';

// utils
import { moderateScale } from 'utils/scale';

// components
import { HeadItem } from 'components/CRM';
import NavItem from 'components/NavItem';
import { routers } from 'constants';

const ContainerView = styled.ScrollView`
  flex: 1;
  background-color: #fff;
`;

const HeaderView = styled.View`
  height: ${moderateScale(100)};
  flex-direction: row;
`;

const NavListView = styled.View`
  margin-top: ${moderateScale(10)};
  margin-bottom: ${moderateScale(10)};
`;

useStrict(true);

const HeadList = [
  {
    icon: require('../../img/crm/customerIcon.png'),
    text: '客户',
    path: routers.customer,
  },
  {
    icon: require('../../img/crm/saleIcon.png'),
    text: '销售机会',
    path: routers.salesChance,
  },
  {
    icon: require('../../img/crm/statisticsIcon.png'),
    text: '业绩统计',
    path: routers.perfStatist,
  },
];

const NavList = [
  {
    icon: require('../../img/crm/markActivity.png'),
    title: '市场活动',
    path: routers.markActivity,
  },
  {
    icon: require('../../img/crm/salesClues.png'),
    title: '销售线索',
    path: routers.salesClues,
  },
  {
    icon: require('../../img/crm/contacts.png'),
    title: '联系人',
    path: routers.contacts,
  },
  {
    icon: require('../../img/crm/contract.png'),
    title: '合同',
    path: routers.contract,
  },
  {
    icon: require('../../img/crm/reimbursementPlan.png'),
    title: '回款计划',
    path: routers.receivablePlan,
  },
  {
    icon: require('../../img/crm/reimbursementOrder.png'),
    title: '回款记录',
    path: routers.receivableRecord,
  },
  {
    icon: require('../../img/crm/product.png'),
    title: '产品',
    path: routers.productList,
  },
  {
    icon: require('../../img/crm/priceList.png'),
    title: '价格表',
    path: routers.priceList,
  },
];

@observer
class CRM extends React.Component {
  onNavHandler = (path) => {
    this.props.navigation.navigate(path);
  };

  render() {
    return (
      <ContainerView>
        <CommStatusBar />
        <LinearGradient
          start={{ x: 1.0, y: 0.0 }}
          end={{ x: 0.0, y: 1.0 }}
          colors={['#98CE5E', '#019D55']}
        >
          <HeaderView>
            {
              HeadList.map((item, index) => (
                <HeadItem
                  key={item.text}
                  isLast={index === HeadList.length - 1}
                  data={item}
                  onPress={() => this.onNavHandler(item.path)}
                />
            ))}
          </HeaderView>
        </LinearGradient>

        <NavListView>
          {
            NavList.map((obj, index) => (
              <NavItem
                leftText={obj.title}
                icon={obj.icon}
                key={obj.title}
                isLast={index === NavList.length - 1}
                onPress={() => this.onNavHandler(obj.path)}
              />
            ))
          }
        </NavListView>
      </ContainerView>
    );
  }
}

CRM.navigationOptions = ({ navigation }) => ({
  title: 'CRM',
  headerRight: (
    <TopRightView
      appName="CRM"
      onPress={() => navigation.navigate(routers.about, {
        // code: 'CRM',
      })}
    />
  ),
});

CRM.defaultProps = {};

CRM.propTypes = {
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

export default CRM;
