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
            if (element.hasAttempt) {
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
            <div className=" mrgn-bttm-md" id="day1">
                <div className="well well-sm">
                    <h4 className="panel-title">
                        {this.props.shift.name} - {this.props.shift.position}
                        <span className="pull-right">
                            <a href="./interviewer_printView.html">
                                <i className="fa fa-print" />
                            </a>
                        </span>
                    </h4>
                </div>
                <Tabs forceRenderTabPanel>
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
