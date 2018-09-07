import React from 'react';
import { hot } from 'react-hot-loader';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ShiftSummaryTab from './components/ShiftSummary';
import Container from './components/Container';
import HourlyTab from './components/Hourly';
import outcomeCategories from './codesets/outcomeCategories';
import claimTypes from './codesets/claimTypes';

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

    filterClaims(claims, hour) {
        var filteredClaims = [];

        claims.forEach(element => {
            if (this.belongsInHour(element, hour)) {
                filteredClaims.push(element);
            }
        });

        return filteredClaims;
    }

    includeHour(element) {
        return element.hasAttempt || element.hasClaim;
    }

    filterHours(hours) {
        var filteredHours = [];
        hours.forEach(element => {
            if (this.includeHour(element)) {
                filteredHours.push(element);
            }
        });

        return filteredHours;
    }

    processJSON() {
        // this is 1 because the shift summary will always be index 0.
        var hourTabIndex = 1;

        this.props.shift.hours.forEach(hour => {
            if (this.props.shift.calls.some(call => this.testIfCallBelongsInHour(call, hour))) {
                hour['hasAttempt'] = true;
            }

            if (this.props.shift.claims.some(claim => this.testIfClaimBelongsInHour(claim, hour))) {
                hour['hasClaim'] = true;
            }

            if (this.includeHour(hour)) {
                hour['tabIndex'] = hourTabIndex;
                hourTabIndex++;
            }
        });

        this.props.shift.calls.forEach(attempt => {
            attempt['hrefId'] =
                'attempt_' + this.props.date + '_' + this.props.shift.username + '_' + attempt.id;
        });

        this.props.shift.claims.forEach(claim => {
            claim['hrefId'] =
                'claim_' + this.props.date + '_' + this.props.shift.username + '_' + claim.id;
        });
    }

    testIfCallBelongsInHour(call, hour) {
        if (call.outcomecategory === outcomeCategories.WHITE_SPOT) {
            return false;
        }

        return this.belongsInHour(call, hour.hour);
    }

    testIfClaimBelongsInHour(claim, hour) {
        if (claim.claimtype === claimTypes.OFF_SYSTEM_TIME) {
            return false;
        }

        return this.belongsInHour(claim, hour.hour);
    }

    belongsInHour(band, hour) {
        var start = parseInt(band.starttime.split(':')[0]);
        var end = parseInt(band.endtime.split(':')[0]);

        // if the claim/call starts inside the given hour, include it
        if (band.starttime.startsWith(hour + ':')) {
            return true;
        }
        // if the claim/call ends right at the start of the given hour, don't include it
        if (band.endtime.startsWith(hour + ':00')) {
            return false;
        }
        // if the claim/call ends within the given hour, include it
        if (band.endtime.startsWith(hour + ':')) {
            return true;
        }

        // if the claim/call spans the given hour, include it
        if (hour > start && hour < end) {
            return true;
        }

        return false;
    }

    render() {
        {
            this.processJSON();
        }

        const filteredHours = this.filterHours(this.props.shift.hours);

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
                        {this.props.shift.name}{' '}
                        <span className="small">- {this.props.shift.position}</span>
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
