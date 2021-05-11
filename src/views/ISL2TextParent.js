import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

import ISL2text from './ISL2Text'
import ISL2text2 from './ISL2Text2'

const ISL2TextParent = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
        <div className="content" style={{padding:"30px", marginTop:"60px"}}>
          <Row>
            <Col md="12">
              <Card>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '1' })}
                    onClick={() => { toggle('1'); }}
                    style={{cursor:"pointer"}}
                  >
                    Static Gestures
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '2' })}
                    onClick={() => { toggle('2'); }}
                    style={{cursor:"pointer"}}
                  >
                    Dynamic Gestures
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <ISL2text2 />
                </TabPane>
                <TabPane tabId="2">
                  <ISL2text />
                </TabPane>
              </TabContent>
              </Card>
            </Col>
          </Row>
        </div>
  );
}

export default ISL2TextParent;
