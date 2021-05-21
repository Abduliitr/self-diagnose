import React from "react";
// react plugin used to create charts
import { Pie } from "react-chartjs-2";
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
  Button
} from "reactstrap";
// core components
import {
  // dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  // dashboardNASDAQChart,
} from "variables/charts.js";

import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

class Dashboard extends React.Component {

  componentDidMount(){
    store.addNotification({
      title: "Welcome!",
      message: "- by Team Sympto Check",
      type: "default",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: true
      }
    });
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-circle-10 text-success" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Complete Health CheckUp</p>
                        <Link to="/admin/diagnosis">
                            <Button color="success" outline style={{fontSize:".35em", lineHeight:"0.35em", padding:"10px 10px"}}>
                                Diagnose Now for free!
                            </Button>
                        </Link>
                        {/* <CardTitle tag="p">$ 1,345</CardTitle> */}
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="far fa-calendar" /> Check Out Now
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-vector text-danger" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Tests done</p>
                        <CardTitle tag="p">23</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="far fa-clock" /> In the last hour
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-satisfied text-primary" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">We are there for you..</p>
                        <p />
                        <Link to="/admin/contact-us">
                            <Button color="warning" outline style={{fontSize:".35em", lineHeight:"0.35em", padding:"10px 10px"}}>
                              Meet Our Team
                            </Button>
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="far fa-item" /> Reach out to us!
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              {/* <Link to="/admin/user-manual"> */}
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-paper text-primary" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category"></p>
                        {/* <CardTitle tag="p">User Guide</CardTitle> */}
                        <p className="card-category">User Guide</p>
                        <p />
                        <Link to="/admin/user-manual">
                            <Button color="danger" outline style={{fontSize:".35em", lineHeight:"0.35em", padding:"10px 10px"}}>
                                How to use?
                            </Button>
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" /> Updated
                  </div>
                </CardFooter>
              </Card>
              {/* </Link> */}
            </Col>
          </Row>

          <Row>
            <Col md="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Datasets Distribution</CardTitle>
                  <p className="card-category">Based on Validation accuracy</p>
                </CardHeader>
                <CardBody>
                  <Pie
                    data={dashboardEmailStatisticsChart.data}
                    options={dashboardEmailStatisticsChart.options}
                  />
                </CardBody>
                <CardFooter>
                  <div className="legend">
                    <i className="fa fa-circle text-primary" style={{padding:"5px"}} /> Art{"   "}
                    <i className="fa fa-circle text-warning" style={{padding:"5px"}}/> Deaf{"   "}
                    <i className="fa fa-circle text-danger" style={{padding:"5px"}}/> I{"   "}
                    <i className="fa fa-circle text-gray" style={{padding:"5px"}}/> Clear
                  </div>
                  <hr />
                  {/* <div className="stats">
                    <i className="fa fa-calendar" /> Number of emails sent
                  </div> */}
                </CardFooter>
              </Card>
            </Col>
            <Col md={6}>
              {/* <Col lg="4" md="12" sm="12"> */}
                <Card className="card-stats">
                  <CardHeader>
                    <CardTitle tag="h5">Dataset Statistics</CardTitle>
                    {/* <p className="card-category">For Dynamic Gesture Recognition</p> */}
                  </CardHeader>
                  <CardBody>
                    <Row>
                      
                      <Col md="9" xs="7">
                        <div className="numbers" style={{textAlign:"left"}}>
                          <p className="card-category">Dynamic Model Efficiency : 80.3%</p>
                          <p className="card-category">(Videos Used : 500+)</p>
                          <br />
                          <p className="card-category">Static Model Efficiency : 98.5%</p>
                          <p className="card-category">(Images Used : 10,000+)</p>
                          <br />
                          <p className="card-category">Text to ISL Dictionary : 1000+ words</p>
                          {/* <p className="card-category">(Images Used : 1000+)</p> */}
                          <p />
                        </div>
                      </Col>
                      <Col md="3" xs="5">
                        <div className="icon-big text-center icon-warning">
                          <i className="nc-icon nc-settings text-danger" />
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
              {/* </Col> */}
            </Col>
            
            {/* <Col md="6">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h5">NASDAQ: AAPL</CardTitle>
                  <p className="card-category">Line Chart with Points</p>
                </CardHeader>
                <CardBody>
                  <Line
                    data={dashboardNASDAQChart.data}
                    options={dashboardNASDAQChart.options}
                    width={400}
                    height={100}
                  />
                </CardBody>
                <CardFooter>
                  <div className="chart-legend">
                    <i className="fa fa-circle text-info" /> Tesla Model S{" "}
                    <i className="fa fa-circle text-warning" /> BMW 5 Series
                  </div>
                  <hr />
                  <div className="card-stats">
                    <i className="fa fa-check" /> Data information certified
                  </div>
                </CardFooter>
              </Card>
            </Col> */}
          </Row>

          {/* <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Users Behavior</CardTitle>
                  <p className="card-category">24 Hours performance</p>
                </CardHeader>
                <CardBody>
                  <Line
                    data={dashboard24HoursPerformanceChart.data}
                    options={dashboard24HoursPerformanceChart.options}
                    width={400}
                    height={100}
                  />
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-history" /> Updated 3 minutes ago
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row> */}
          
        </div>
      </>
    );
  }
}

export default Dashboard;