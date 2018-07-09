import React from 'react';
import { hot } from 'react-hot-loader';

class App extends React.Component {
    render() {
        const days = [];
        cvcData.days.forEach(element => {
            days.push(
                <DateAccordion
                    key={element.date}
                    formattedDate={element.formattedDate}
                    shifts={element.shifts}
                />
            );
        });

        return days;
    }
}

class DateAccordion extends React.Component {
    render() {
        const shifts = [];
        this.props.shifts.forEach(element => {
            shifts.push(<InterviewerShift key={element.username} shift={element} />);
        });

        return (
            <details className="acc-group mrgn-bttm-md" open>
                <summary className="panel-heading-collapsible pddng-sm h3">
                    {this.props.formattedDate}
                </summary>
                {shifts}
            </details>
        );
    }
}

class InterviewerShift extends React.Component {
    render() {
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
                        <ShiftSummaryTab shift={this.props.shift} />
                    </div>
                </div>
            </div>
        );
    }
}

class ShiftSummaryTab extends React.Component {
    render() {
        return (
            <details id="day1_int1_sum" open>
                <summary>Summary</summary>
                <div className="row">
                    <div className="col-sm-10 col-md-10">
                        <div className="row">
                            <div className="col-sm-3 col-md-3">
                                <h5 className="mrgn-lft-md">
                                    <i className="fa fa-calendar" />
                                    {this.props.shift.formattedDate}
                                </h5>
                            </div>
                            <div className="col-sm-3 col-md-3">
                                <h5>
                                    <i className="fa fa-clock-o" /> {this.props.shift.shiftStart} -{' '}
                                    {this.props.shift.shiftEnd}
                                </h5>
                            </div>
                        </div>
                        <div className="row">
                            <BarGraph
                                hours={this.props.shift.hours}
                                finalHourLabel={this.props.shift.finalHourLabel}
                                renderLink={this.props.shift.renderLink}
                            />
                        </div>
                    </div>
                    <div className="col-sm-2 col-md-2">
                        <div className="text-right mrgn-tp-md">
                            <p>Calls: {this.props.shift.calls}</p>
                            <p>Cases touched: {this.props.shift.casesTouched}</p>
                            <p>Surveys: {this.props.shift.surveys}</p>
                            <p>Total off system time: {this.props.shift.totalOffSystemTime}</p>
                            <p>Hours claimed: {this.props.shift.hoursClaimed}</p>
                        </div>
                    </div>
                </div>
                <SummaryCaseWorkDetailsAccordion hours={this.props.shift.hours} />
                <PayClaimSummaryAccordion claims={this.props.shift.claims} />
            </details>
        );
    }
}

class BarGraph extends React.Component {
    render() {
        return (
            <div className="col-sm-12 col-md-12 cvc-barGraph">
                <br />
                <BarGraphLine1 shiftStart={this.props.shiftStart} shiftEnd={this.props.shiftEnd} />
                <table className="mrgn-lft-md width100">
                    <tbody>
                        <tr className="brdr-bttm brdr-lft brdr-rght">
                            <td style={{ width: '16.67%' }} className="bg-off-sys ln-hght-30px">
                                &nbsp;
                            </td>
                            <td
                                style={{ width: '0.28%' }}
                                className="zoom bg-off-sys brdr-lft-drk"
                            />
                            <td style={{ width: '0.28%' }} className="zoom bg-nocon" />
                            <td style={{ width: '0.28%' }} className="zoom bg-off-sys" />
                            <td style={{ width: '0.28%' }} className="zoom bg-nocon-2" />
                            <td style={{ width: '0.14%' }} className="zoom bg-off-sys" />
                            <td style={{ width: '4.31%' }} className="zoom bg-res" />
                            <td style={{ width: '0.28%' }} className="zoom bg-off-sys" />
                            <td style={{ width: '0.69%' }} className="zoom bg-nocon" />
                            <td style={{ width: '1.11%' }} className="zoom bg-off-sys" />
                            <td style={{ width: '5.14%' }} className="zoom bg-res" />
                            <td style={{ width: '0.28%' }} className="zoom bg-off-sys" />
                            <td style={{ width: '5.00%' }} className="zoom bg-res-2" />

                            <td style={{ width: '0.42%' }} className="zoom bg-off-sys" />
                            <td style={{ width: '0.42%' }} className="zoom bg-nocon" />
                            <td style={{ width: '0.28%' }} className="zoom bg-off-sys" />
                            <td style={{ width: '4.72%' }} className="zoom bg-res" />
                            <td style={{ width: '9.03%' }} className="zoom bg-off-sys" />
                            <td style={{ width: '0.28%' }} className="zoom bg-nocon" />
                            <td style={{ width: '0.14%' }} className="zoom bg-off-sys" />
                            <td style={{ width: '5.00%' }} className="zoom bg-res" />
                            <td style={{ width: '0.56%' }} className="zoom bg-off-sys" />
                            <td style={{ width: '3.89%' }} className="zoom bg-other-sur" />
                            <td style={{ width: '0.28%' }} className="zoom bg-off-sys" />
                            <td style={{ width: '4.17%' }} className="zoom bg-res" />
                            <td style={{ width: '3.33%' }} className="zoom bg-off-sys" />

                            <td style={{ width: '0.56%' }} className="zoom bg-nocon" />
                            <td style={{ width: '0.14%' }} className="zoom bg-off-sys" />
                            <td style={{ width: '0.42%' }} className="zoom bg-nocon-2" />
                            <td style={{ width: '0.56%' }} className="zoom bg-off-sys" />
                            <td style={{ width: '0.28%' }} className="zoom bg-nocon-3" />
                            <td style={{ width: '0.28%' }} className="zoom bg-off-sys" />
                            <td style={{ width: '2.78%' }} className="zoom bg-ref" />
                            <td style={{ width: '0.28%' }} className="zoom bg-off-sys" />
                            <td style={{ width: '0.42%' }} className="zoom bg-nocon" />
                            <td style={{ width: '0.42%' }} className="zoom bg-off-sys" />
                            <td style={{ width: '0.42%' }} className="zoom bg-nocon-2" />
                            <td style={{ width: '0.14%' }} className="zoom bg-off-sys" />
                            <td style={{ width: '0.69%' }} className="zoom bg-other" />
                            <td style={{ width: '8.75%' }} className="zoom bg-off-sys" />
                            <td style={{ width: '16.67%' }} className="bg-off-sys brdr-lft-drk" />
                        </tr>
                    </tbody>
                </table>
                <table className="mrgn-lft-md width100">
                    <tbody>
                        <tr className="brdr-lft brdr-rght brdr-bttm">
                            <td
                                style={{ width: '16.67%' }}
                                className="bg-off-sys brdr-rght ln-hght-30px"
                            >
                                &nbsp;
                            </td>
                            <td style={{ width: '25%' }} className="zoom bg-claimed brdr-lft-drk" />
                            <td style={{ width: '8.33%' }} className="zoom bg-off-sys" />
                            <td style={{ width: '6.3%' }} className="zoom bg-claimed" />
                            <td style={{ width: '3.89%' }} className="zoom bg-other-claim" />
                            <td style={{ width: '14.81%' }} className="zoom bg-claimed" />
                            <td style={{ width: '8.33%' }} className="zoom bg-other-task" />
                            <td style={{ width: '16.67%' }} className="bg-off-sys brdr-lft-drk" />
                        </tr>
                    </tbody>
                </table>
                <table className="mrgn-lft-md width100">
                    <tbody>
                        <BarGraphLine4 hours={this.props.hours} />
                        <BarGraphLine5
                            hours={this.props.hours}
                            finalHourLabel={this.props.finalHourLabel}
                            renderLink={this.props.renderLink}
                        />
                    </tbody>
                </table>
            </div>
        );
    }
}

// this component will always be three elements, it renders the top 'black bars' of the bar graph, based on the start and end of the interviewer's shift
class BarGraphLine1 extends React.Component {
    // these will require calculation based on props 'shiftStart' and 'shiftEnd'.
    getWidth1() {
        return '16.67%';
    }

    getWidth2() {
        return '66.66%';
    }

    getWidth3() {
        return '16.67%';
    }

    getDivStyle(width) {
        return { width: width };
    }

    render() {
        return (
            <table className="row_flags mrgn-lft-md brdr-lft-white brdr-rght-white width100">
                <tbody>
                    <tr className="brdr-bttm brdr-lft-white brdr-rght-white">
                        <td style={this.getDivStyle(this.getWidth1())} className="ln-hght-30px">
                            &nbsp;
                        </td>
                        <td style={this.getDivStyle(this.getWidth2())} className="brdr-lft-drk" />
                        <td style={this.getDivStyle(this.getWidth3())} className="brdr-lft-drk" />
                    </tr>
                </tbody>
            </table>
        );
    }
}

class BarGraphLine4 extends React.Component {
    render() {
        const divideBy = this.props.hours.length * 2;
        const width = (100 / divideBy).toFixed(2);
        var divStyle = {
            width: width + '%',
        };

        const rows = [];
        this.props.hours.forEach(element => {
            rows.push(
                <td key={element.start + '-1'} style={divStyle}>
                    &nbsp;
                </td>
            );
            rows.push(<td key={element.start + '-2'} style={divStyle} className="brdr-rght" />);
        });

        return <tr className="brdr-lft brdr-rght text-center">{rows}</tr>;
    }
}

class BarGraphLine5 extends React.Component {
    getClassName(index) {
        return index === 0 ? 'ln-hght-30px' : 'text-center';
    }

    getColSpan(index) {
        return index === 0 ? '1' : '2';
    }

    getTDValue(hour, renderLink) {
        if (renderLink) {
            return <a href={hour.hourLinkTarget}>{hour.start}</a>;
        } else {
            return hour.start;
        }
    }

    render() {
        const rows = [];
        for (var i = 0; i < this.props.hours.length; i++) {
            rows.push(
                <td
                    key={this.props.hours[i].start}
                    className={this.getClassName(i)}
                    colSpan={this.getColSpan(i)}
                >
                    {this.getTDValue(this.props.hours[i], this.props.renderLink)}
                </td>
            );
        }
        return (
            <tr>
                {rows}
                <td className="text-right">{this.props.finalHourLabel}</td>
            </tr>
        );
    }
}

class SummaryCaseWorkDetailsAccordion extends React.Component {
    render() {
        const rows = [];
        this.props.hours.forEach(element => {
            rows.push(<SummaryCaseWorkDetailsHourRow key={element.start} hour={element} />);
        });

        return (
            <details className="acc-group mrgn-bttm-md mrgn-tp-md">
                <summary className="panel-heading-collapsible pddng-sm">
                    View case work details
                </summary>
                <div>
                    <table className="table table-striped mrgn-bttm-0">
                        <thead>
                            <tr>
                                <th>
                                    Time slice{' '}
                                    <span className="text-normal">
                                        (<abbr title="hours and minutes">hh:mm</abbr>)
                                    </span>
                                </th>
                                <th className="text-right width20">
                                    <span className="bg-res display-inline-block pddng-8px" />{' '}
                                    Responses
                                </th>
                                <th className="text-right width20">
                                    <span className="bg-ref display-inline-block pddng-8px" />{' '}
                                    Refusals
                                </th>
                                <th className="text-right width20">
                                    <span className="bg-nocon display-inline-block pddng-8px" /> No
                                    contacts
                                </th>
                                <th className="text-right width20">
                                    <span className="bg-other display-inline-block pddng-8px" />{' '}
                                    Other outcomes
                                </th>
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </table>
                </div>
            </details>
        );
    }
}

class SummaryCaseWorkDetailsHourRow extends React.Component {
    render() {
        const hour = this.props.hour;
        return (
            <tr>
                <td>
                    <a href="#day1_int1_11am">{hour.description}</a>
                </td>
                <td className="text-right">{hour.responses}</td>
                <td className="text-right">{hour.refusals}</td>
                <td className="text-right">{hour.nocontacts}</td>
                <td className="text-right">{hour.otheroutcomes}</td>
            </tr>
        );
    }
}

class PayClaimSummaryAccordion extends React.Component {
    render() {
        const rows = [];
        this.props.claims.map(element => {
            rows.push(<PayClaimSummaryRow key={element.id.toString()} claim={element} />);
        });

        return (
            <details className="acc-group mrgn-bttm-md">
                <summary className="panel-heading-collapsible pddng-sm">Pay claim summary</summary>
                <div>
                    <table className="table table-striped mrgn-bttm-0">
                        <thead>
                            <tr>
                                <th className="width25">
                                    Time{' '}
                                    <span className="text-normal">
                                        (<abbr title="hours and minutes">hh:mm</abbr>)
                                    </span>
                                </th>
                                <th className="width15">PE code</th>
                                <th className="width15">Survey</th>
                                <th className="width45">Activity</th>
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </table>
                </div>
            </details>
        );
    }
}

class PayClaimSummaryRow extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.claim.time}</td>
                <td>{this.props.claim.pecode}</td>
                <td>{this.props.claim.surveyAcronym}</td>
                <td>{this.props.claim.activity}</td>
            </tr>
        );
    }
}

export default hot(module)(App); // eslint-disable-line
