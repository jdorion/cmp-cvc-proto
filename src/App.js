import React from 'react';
import { hot } from 'react-hot-loader';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ShiftSummaryTab from './components/ShiftSummary';
import Container from './components/Container';
import HourlyTab from './components/Hourly';

class App extends React.Component {
    render() {
        const days = [];
        cvcData.days.forEach(day => {
            const shifts = [];
            day.shifts.forEach(shift => {
                shifts.push(
                    <InterviewerShift
                        key={shift.username}
                        shift={shift}
                        isPrintView={cvcData.isPrintView}
                        date={day.date}
                        formattedDate={day.formattedDate}
                    />
                );
            });
            days.push(
                <Container
                    key={day.date}
                    title={day.formattedDate}
                    includeH3={true}
                    isOpen={true}
                    shifts={day.shifts}
                >
                    {shifts}
                </Container>
            );
        });

        return days;
    }
}

class InterviewerShift extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tabIndex: 0 };
        this.handleTabLinkSelected = this.handleTabLinkSelected.bind(this);
    }

    handleTabLinkSelected(hourIndex) {
        this.setState({
            tabIndex: hourIndex,
        });
    }

    filterCalls(calls, hour) {
        var filteredCalls = [];

        calls.forEach(element => {
            if (
                element.starttime.startsWith(hour + ':') ||
                element.endtime.startsWith(hour + ':')
            ) {
                filteredCalls.push(element);
            }
        });

        return filteredCalls;
    }

    claimBelongsInHour(claim, hour) {
        var claimStart = parseInt(claim.starttime.split(":")[0]);
        var claimEnd = parseInt(claim.endtime.split(":")[0]);
        // if the claim starts inside the given hour, include it
        if (claim.starttime.startsWith(hour + ':')) {
            return true;
        }
        // if the claim ends right at the start of the given hour, don't include it
        if (claim.endtime.startsWith(hour + ':00')) {
            return false;
        }
        // if the claim ends within the given hour, include it
        if (claim.endtime.startsWith(hour + ':')) {
            return true;
        }

        // if the claim spans the given hour, include it
        if (hour > claimStart && hour < claimEnd) {
            return true;
        }

        return false;
    }

    filterClaims(claims, hour) {
        var filteredClaims = [];

        claims.forEach(element => {
            if (this.claimBelongsInHour(element, hour)) {
                filteredClaims.push(element);
            }
        });

        return filteredClaims;
    }

    render() {
        const filteredHours = [];
        this.props.shift.hours.forEach(element => {
            if (element.hasAttempt || element.hasClaim) {
                filteredHours.push(element);
            }
        });

        const hourlist = [];
        filteredHours.forEach(element => {
            hourlist.push(<Tab key={element.hour}>{element.hour + ':00'}</Tab>);
        });

        const hours = [];
        filteredHours.forEach(element => {
            hours.push(
                <TabPanel key={element.hour + 'panel'}>
                    <HourlyTab
                        date={this.props.date}
                        username={this.props.shift.username}
                        hour={element}
                        formattedDate={this.props.formattedDate}
                        isCATI={this.props.shift.isCATI}
                        calls={this.filterCalls(this.props.shift.calls, element.hour)}
                        claims={this.filterClaims(this.props.shift.claims, element.hour)}
                    />
                </TabPanel>
            );
        });

        return (
            <div className="mrgn-tp-md mrgn-bttm-md" id="day1">
                <div className="well well-sm mrgn-bttm-sm">
                    <h4 className="panel-title">
                        {this.props.shift.name} <span className="small">- {this.props.shift.position}</span>
                        <span className="pull-right">
                            <a href="./interviewer_printView.html">
                                <i className="fa fa-print" />
                            </a>
                        </span>
                    </h4>
                </div>
                <Tabs
                    selectedIndex={this.state.tabIndex}
                    onSelect={tabIndex => this.setState({ tabIndex })}
                >
                    <TabList>
                        <Tab>Summary</Tab>
                        {hourlist}
                    </TabList>
                    <TabPanel>
                        <ShiftSummaryTab
                            shift={this.props.shift}
                            date={this.props.date}
                            formattedDate={this.props.formattedDate}
                            isPrintView={this.props.isPrintView}
                            handleTabLinkSelected={this.handleTabLinkSelected}
                        />
                    </TabPanel>
                    {hours}
                </Tabs>
                <div className="wb-tabs">
                    <div className="tabpanels">{hours}</div>
                </div>
            </div>
        );
    }
}

export default hot(module)(App); // eslint-disable-line
