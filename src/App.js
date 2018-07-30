import React from 'react';
import { hot } from 'react-hot-loader';
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

    filterClaims(claims, hour) {
        var filteredClaims = [];

        claims.forEach(element => {
            if (element.time && element.time.includes(hour + ':')) {
                filteredClaims.push(element);
            }
        });

        return filteredClaims;
    }

    render() {
        const hours = [];
        this.props.shift.hours.forEach(element => {
            if (element.hasAttempt) {
                hours.push(
                    <HourlyTab
                        key={element.hour}
                        hour={element}
                        formattedDate={this.props.formattedDate}
                        isCATI={this.props.shift.isCATI}
                        calls={this.filterCalls(this.props.shift.calls, element.hour)}
                        claims={this.filterClaims(this.props.shift.claims, element.hour)}
                    />
                );
            }
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
                <div className="wb-tabs">
                    <div className="tabpanels">
                        <ShiftSummaryTab
                            shift={this.props.shift}
                            formattedDate={this.props.formattedDate}
                            isPrintView={this.props.isPrintView}
                        />
                        {hours}
                    </div>
                </div>
            </div>
        );
    }
}

export default hot(module)(App); // eslint-disable-line
