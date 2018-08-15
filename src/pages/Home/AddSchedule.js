import React, { Component } from 'react';
import styled from 'styled-components';

import NavView from '../../components/NavItem';
import { CommStatusBar } from '../../components/Layout';

const ContainerView = styled.View``;

const ScrollView = styled.ScrollView`

`;

class AddSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ContainerView>
        <CommStatusBar />
        <ScrollView>
          <NavView leftText="日程主题" rightText="开心句号" />
        </ScrollView>
      </ContainerView>
    );
  }
}

export default AddSchedule;
