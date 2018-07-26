import React from 'react';
import { hot } from 'react-hot-loader';
import ShiftSummaryTab from './components/ShiftSummary';
import Container from './components/Container';
import HourlyTab from './components/Hourly';

class App extends React.Component {
    render() {
        const days = [];
        cvcData.days.forEach(element => {
            const shifts = [];
            element.shifts.forEach(element => {
                shifts.push(
                    <InterviewerShift
                        key={element.username}
                        shift={element}
                        isPrintView={cvcData.isPrintView}
                    />
                );
            });
            days.push(
                <Container
                    key={element.date}
                    title={element.formattedDate}
                    includeH3={true}
                    isOpen={true}
                    shifts={element.shifts}
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

    render() {
        const hours = [];
        this.props.shift.hours.forEach(element => {
            hours.push(
                <HourlyTab
                    key={element.start}
                    hour={element}
                    isCATI={this.props.shift.isCATI}
                    calls={this.filterCalls(this.props.shift.calls, element.hour)}
                />
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
                <div className="wb-tabs">
                    <div className="tabpanels">
                        <ShiftSummaryTab
                            shift={this.props.shift}
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
