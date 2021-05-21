import React from "react";

import { Link } from "react-router-dom";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  // Button
} from "reactstrap";
// core components

// import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

class UserManual extends React.Component {

  render() {
    return (
      <>
        <div className="content">

          <Row>

            <Col md={12}>
                <Card className="card-stats">
                  <CardHeader>
                    <CardTitle tag="h5">Overview of Sympto-Check: </CardTitle>
                    <div className="icon-big text-center icon-warning" style={{position:"absolute", right:"10px"}}>
                        <i className="nc-icon nc-favourite-28 text-danger" />
                    </div>

                  </CardHeader>
                  <CardBody>
                    <Row> 
                      <Col md="9" xs="7">
                        <div className="numbers" style={{textAlign:"left"}}>
                          {/* <p className="card-category">(Images Used : 1000+)</p> */}
                          <p className="card-category">An AI-powered software that helps people to self-diagnose ailments</p>
                          <p />
                        </div>
                      </Col>
                      {/* <Col md="3" xs="5">
                        <div className="icon-big text-center icon-warning">
                          <i className="nc-icon nc-settings text-danger" />
                        </div>
                      </Col> */}
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="stats">
                      {/* <i className="fas fa-sync-alt" /> Update now */}
                    </div>
                  </CardFooter>
                </Card>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
            <Card className="card-stats">
                  <CardHeader>
                    <CardTitle tag="h5">
                        <Link to="/admin/text2isl" style={{color:"#fbc658", textDecoration:"none"}}>
                            English to ISL{"  "}
                        </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Row> 
                      <Col md="12">
                        <div className="numbers" style={{textAlign:"left"}}>
                          {/* <p className="card-category">(Images Used : 1000+)</p> */}
                          <p className="card-category">
                                <ul>
                                    <li>Consists of ISL animations of almost 1000+ English words..</li><br />
                                    <li>Uses synonym feature for words not present in dictionary</li><br />
                                    <li>Spells out the complicated words</li>
                                </ul>
                              </p>
                          <p />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="stats">
                      {/* <i className="fas fa-sync-alt" /> Update now */}
                    </div>
                  </CardFooter>
                </Card>
            </Col>
            <Col md={4}>
            <Card className="card-stats">
                  <CardHeader>
                    <CardTitle tag="h5">
                        <Link to="/admin/isl2text" style={{color:"#6bd098", textDecoration:"none"}}>
                            ISL to English (Static){"  "}
                        </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Row> 
                      <Col md="12">
                        <div className="numbers" style={{textAlign:"left"}}>
                          {/* <p className="card-category">(Images Used : 1000+)</p> */}
                          <p className="card-category">
                                <ul>
                                    <li>Can predict the geture of single digit numbers</li><br />
                                    <li>Can predict the gesture of alphabets except H and Y (since there gesture is dynamic..)</li><br />
                                    <li>Fast processing based on Image classification</li>
                                </ul>
                              </p>
                          <p />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="stats">
                      {/* <i className="fas fa-sync-alt" /> Update now */}
                    </div>
                  </CardFooter>
                </Card>
            </Col>
            <Col md={4}>
                <Card className="card-stats">
                  <CardHeader>
                    <CardTitle tag="h5">
                        <Link to="/admin/isl2text" style={{color:"#ef8157", textDecoration:"none"}}>
                            ISL to English (Dynamic){"  "}
                        </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Row> 
                      <Col md="12">
                        <div className="numbers" style={{textAlign:"left"}}>
                          {/* <p className="card-category">(Images Used : 1000+)</p> */}
                          <p className="card-category">
                                <ul>
                                    <li>Can predict the geture except those alphabets and numbers</li><br />
                                    {/* <li>Can predict the gesture of alphabets except H and Y (since there gesture is dynamic..)</li><br /> */}
                                    <li>Takes relatively more time as it's based on video classification</li>
                                </ul>
                              </p>
                          <p />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="stats">
                      {/* <i className="fas fa-sync-alt" /> Update now */}
                    </div>
                  </CardFooter>
                </Card>
            </Col>
          </Row>
          
        </div>
      </>
    );
  }
}

export default UserManual;