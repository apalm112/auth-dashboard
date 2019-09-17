import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button, ButtonGroup } from "shards-react";
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

// const Analytics = ({ smallStats }) => (

// Creates a new Componet Class & exports it.
export default class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vuData: [],
    };
    this.handleFetchData = this.handleFetchData.bind(this);
  }

  async performSearch() {
    // fetch()
    // should Not need to use fetch(), since vuData is getting passed thru via props destructuring
    // ^---NVM! The vuData is not getting thru to React YET!
    //      smallStats is just the PropTypes defaults that are hard wired in.
    // setState & render collection data:
    // fetch('/analytics')
    try {
      const res = await fetch("http://localhost:5000/analytics")
        const vuData = await res.json()
        this.setState({ vuData })
          .then(res => res.json())
          .then(data => this.setState({ vuData: data }));    
    } catch (err) {
      console.error(err);
    }
  }

/***********************************************************************/
  handleFetchData = async () => {
		try {
			const galatica = await fetch('/analytics');
			const vuData = await galatica.json();			
		return vuData;
		} catch(err) {
			console.error(err);
		}
	};
    
  componentDidMount() {
    // this.performSearch();
    
    this.handleFetchData()
    .then(res => Object.keys(res).map((key) => {
      // console.log(res[key]);
      return res[key];
    }))
    .then(newRes => this.setState({ vuData: newRes }))
    // .then(newRes => console.log('FUCK this.state.vuData---->', this.state.vuData))
    .catch(error => {
      console.error("Error fetching & parsing the data.", error);
    })
  }
  /***********************************************************************/

  render() {
    const results = this.state.vuData;
    
    // const Analytics = ({ smallStats }) => (
    //Your passed arguments are available to you in an object called props, which in a class based component can be referenced and destructured in the render method as follows:
    const { smallStats } = this.props;
    // console.log( "smallStats Data from /Analytics.js: ", smallStats );    
    console.log("this.state.vuData from /Analytics.js: ", results);    

    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          {/* Page Header :: Title */}
          <PageTitle title="NeoVu Analytics" subtitle="Overview" className="text-sm-left mb-3" />

          {/* Page Header :: Actions */}
          <Col xs="12" sm="4" className="col d-flex align-items-center">
            <ButtonGroup size="sm" className="d-inline-flex mb-3 mb-sm-0 mx-auto">
              <Button theme="white" tag={NavLink} to="/analytics">
                Traffic
              </Button>
              <Button theme="white" tag={NavLink} to="/ecommerce">
                Sales
              </Button>
            </ButtonGroup>
          </Col>

          {/* Page Header :: Datepicker */}
          <Col sm="4" className="d-flex">
            <RangeDatePicker className="justify-content-end" />
          </Col>
        </Row>

        {/* Small Stats Blocks */}
        <Row>
          {smallStats.map((stats, idx) => (
            <Col key={idx} md="6" lg="3" className="mb-4">
              <SmallStats
                id={`small-stats-${idx}`}
                chartData={stats.datasets}
                chartLabels={stats.chartLabels}
                label={stats.label}
                value={stats.num_Vu_Opened}
                percentage={stats.percentage}
                increase={stats.increase}
                decrease={stats.decrease}
              />
            </Col>
          ))}
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

Analytics.propTypes = {
  /**
   * The small stats data.
   */
  smallStats: PropTypes.array
};

Analytics.defaultProps = {
  smallStats: [
    {
      label: "Number of Times Vu Opened",
      value: "2,390",
      percentage: "12.4%",
      increase: true,
      chartLabels: [null, null, null, null, null],
      decrease: false,
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: colors.primary.toRGBA(0.1),
          borderColor: colors.primary.toRGBA(),
          data: [9, 3, 3, 9, 9]
        }
      ]
    },
    {
      label: "Vu Duration",
      value: "8,391",
      percentage: "7.21%",
      increase: false,
      chartLabels: [null, null, null, null, null],
      decrease: true,
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: colors.success.toRGBA(0.1),
          borderColor: colors.success.toRGBA(),
          data: [3.9, 4, 4, 9, 4]
        }
      ]
    },
    {
      label: "Number of Button Taps",
      value: "21,293",
      percentage: "3.71%",
      increase: true,
      chartLabels: [null, null, null, null, null],
      decrease: false,
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: colors.warning.toRGBA(0.1),
          borderColor: colors.warning.toRGBA(),
          data: [6, 6, 9, 3, 3]
        }
      ]
    },
    {
      label: "Pages/Session",
      value: "6.43",
      percentage: "2.71%",
      increase: false,
      chartLabels: [null, null, null, null, null],
      decrease: true,
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: colors.salmon.toRGBA(0.1),
          borderColor: colors.salmon.toRGBA(),
          data: [0, 9, 3, 3, 3]
        }
      ]
    }
  ]
};

// export default Analytics;
