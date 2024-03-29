import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button, ButtonGroup, Tooltip } from "shards-react";
import { NavLink } from "react-router-dom";

import PageTitle from "../components/common/PageTitle";
import RangeDatePicker from "../components/common/RangeDatePicker";
import SmallStats from "../components/common/SmallStats";
import TopReferrals from "../components/common/TopReferrals";
import CountryReports from "../components/common/CountryReports";
import Sessions from "../components/analytics/Sessions";
import UsersByDevice from "../components/analytics/UsersByDevice";
import GoalsOverview from "../components/analytics/GoalsOverview/GoalsOverview";

import colors from "../utils/colors";

// Creates a new Component Class & exports it.
export default class Analytics extends Component {

  static propTypes = {
    /**
     * The small stats data.
     */
    smallStats: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      vuData: [],
    };
  }

  /***********************************************************************/
  handleFetchData = async () => {
		try {
			const fetchData = await fetch('/analytics');
			const vuData = await fetchData.json();		
		return vuData;
		} catch(err) {
			console.error(err);
		}
	};
    
  handleDataSetToState = () => {
    this.handleFetchData()
    .then(res => Object.keys(res).map((key) => {
      // console.log('OVER HERE----->', res[key]);
      return res[key];
    }))
    .then(res => res.map((curr, idx) => {
      // return curr = Object.assign(curr, (JSON.parse(JSON.stringify(this.props.smallStats))))
      return curr = { ...this.props.smallStats, ...curr }
    }))
    .then(vuData =>
      this.setState({ vuData }
      // this.setState((prevState) => { return { vuData: [...prevState.vuData, { vuData } ] } }
      ))
    // .then(newRes => console.log('this.state.vuData---->', this.state.vuData))
    .catch(error => {
      console.error("Error fetching & parsing the data.", error);
    })
  };

  async componentDidMount() {
    try {
      await this.handleDataSetToState();
    } catch(err) {
      console.error(err);
    }
  }
  /***********************************************************************/
  render() {
    const VUDATA = this.state.vuData;
    console.log('VUDATA', VUDATA);
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          {/* Page Header :: Title */}
          <PageTitle title="NeoVu Analytics" subtitle="Overview" className="text-sm-left mb-3" />

          {/* Page Header :: Actions */}
          <Col xs="12" sm="4" className="col d-flex align-items-center">
            <ButtonGroup size="sm" className="d-inline-flex mb-3 mb-sm-0 mx-auto">
              {/*  <Button theme="white" tag={NavLink} to="/analytics">
                Traffic
              </Button>
              <Button theme="white" tag={NavLink} to="/ecommerce">
                Sales
              </Button> */}
            </ButtonGroup>
          </Col>

          {/* Page Header :: Datepicker */}
          <Col sm="4" className="d-flex">
            <RangeDatePicker className="justify-content-end" />
          </Col>
        </Row>

        {/* Small Stats Blocks */}
        <Row>          
          { VUDATA.map((stats, idx) => (
              <Col key={idx} md="6" lg="3" className="mb-4">
                <SmallStats
                  id={`small-stats-${idx}`}
                  chartData={stats.datasets}
                  label={stats.label}
                  chartLabels={this.props.smallStats.chartLabels}
                  value={stats.value}
                  percentage={stats.percentage}
                  increase={this.props.smallStats.increase}
                  decrease={this.props.smallStats.decrease}
                />
              </Col>
            ))
          }
        </Row>

        <Row>
          {/* Sessions */}
          <Col lg="8" md="12" sm="12" className="mb-4">
            <Sessions />
          </Col>

          {/* Users by Device */}
          <Col lg="4" md="6" sm="6" className="mb-4">
            <UsersByDevice />
          </Col>

          {/* Top Referrals */}
          <Col lg="3" sm="6" className="mb-4">
            <TopReferrals />
          </Col>

          {/* Goals Overview */}
          <Col lg="5" className="mb-4">
            <GoalsOverview />
          </Col>

          {/* Country Reports */}
          <Col lg="4" className="mb-4">
            <CountryReports />
          </Col>
        </Row>
      </Container>
    );
  }
};

Analytics.defaultProps = {
  smallStats: {
      label: "Hard Wired via Analytics.defaultProps",
      value: 666,
      percentage: "6%",
      increase: true,
      chartLabels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri'],
      decrease: false,
      datasets: [
        {
          label: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri'],
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: colors.primary.toRGBA(0.1),
          borderColor: colors.primary.toRGBA(),
          data: [9, 3, 3, 9, 9]
        }
      ]
    }
};