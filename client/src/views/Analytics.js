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

// const Analytics = ({ smallStats }) => (

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
      chartStats: {},
        //   label: "",
        //   value: 666,
        //   percentage: "6%",
        //   increase: true,
        //   chartLabels: ['UFO', null, null, null, null],
        //   decrease: false,
        //   datasets: [
        //     {
        //       label: "Today",
        //       fill: "start",
        //       borderWidth: 1.5,
        //       backgroundColor: colors.primary.toRGBA(0.1),
        //       borderColor: colors.salmon.toRGBA(),
        //       data: [9, 3, 3, 9, 9],
        //     }
        //   ]
        // },
      vuData: [],
    };
    // this.handleFetchData = this.handleFetchData.bind(this);
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
      // console.log(res[key]);
      return res[key];
    }))
    .then(res => res.map((curr, idx) => {
      return curr = Object.assign(curr, (JSON.parse(JSON.stringify(this.state.chartStats))))
    }))
    .then(vuData =>
      // comment back in to see data rendered to dashboard.
      this.setState({ vuData }
      // this.setState((prevState) => { return { vuData: [...prevState.vuData, { vuData } ] } }
      ))
    .then(newRes => console.log('this.state.vuData---->', this.state.vuData))
    .catch(error => {
      console.error("Error fetching & parsing the data.", error);
    })
  };

  async componentDidMount() {
    try {
      await this.handleDataSetToState();
      const getChartData = this.state.chartStats.datasets[0].data;
      console.log(getChartData);
    } catch(err) {
      console.error(err);
    }
  }
  /***********************************************************************/
  render() {
    const VUDATA = this.state.vuData;

    const handleChartData = VUDATA[3];
    console.log(handleChartData);

   // const CHARTSTATS = this.state.chartStats;
    
    // const Analytics = ({ smallStats }) => (
    //Your passed arguments are available to you in an object called props, which in a class based component can be referenced and destructured in the render method as follows:
    // const { smallStats } = this.props;
    // console.log( "this.state.chartStats:{{{{ ", CHARTSTATS );    
    console.log("this.state.vuData from /Analytics.js: ", VUDATA);

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
          {/* <table>
            <tbody>
              <colgroup>
                <col />>
							<col span="2" />
                <col span="2" />
              </colgroup>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Num Vu Opened</th>
                <th scope="col">Vu Duration</th>
                <th scope="col">Button Taps</th>
              </tr>
              {
                VUDATA.map((curr) => {
                return (
                  <tr key={curr._id}>
                    <td>{curr.name}</td>
                    <td>{curr.num_Vu_Opened}</td>
                    <td>{curr.vu_Duration}</td>
                    <td>{curr.button_taps}</td>
                  </tr>
                )})
              }
            </tbody>
          </table> */}
          
          { VUDATA.map((stats, idx) => (
              <Col key={idx} md="6" lg="3" className="mb-4">
                <SmallStats
                  id={`small-stats-${idx}`}
                  // chartData={stats[0].datasets[0].data}
                  // chartData={stats.datasets}
                  // chartLabels={stats.chartLabels}
                  // label={stats.name}
                  // value={stats.button_taps}
                  // percentage={stats.num_Vu_Opened}
                  // increase={stats.increase}
                  // decrease={stats.decrease}

                  chartData={this.props.smallStats[0].datasets}
                  chartLabels={this.props.smallStats[0].chartLabels}
                  label={stats.name}
                  value={stats.button_taps}
                  percentage={stats.num_Vu_Opened}
                  increase={this.props.smallStats[0].increase}
                  decrease={this.props.smallStats[0].decrease}

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
  smallStats: [
    {
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
          // find a way to dynamically insert db data into the data property below:
          data: [9, 3, 3, 9, 9]
        },
        {
          label: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri'],
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: colors.blueishGrey.toRGBA(0.1),
          borderColor: colors.primary.toRGBA(),
          data: [19, 13, 13, 19, 19]
        },
      ]
    },
    {
      label: "Users",
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
      label: "Sessions",
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
      label: "Pageviews",
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
