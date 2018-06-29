import React from 'react';
import { hot } from 'react-hot-loader';

class DateAccordion extends React.Component {
    render() {
        return (
            <details className="acc-group mrgn-bttm-md" open>
                <summary className="panel-heading-collapsible pddng-sm h3">
                    Sun. January 14, 2018
                </summary>
                <InterviewerShift />
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
                        April Gardiner - CATI Interviewer
                        <span className="pull-right">
                            <a href="./interviewer_printView.html">
                                <i className="fa fa-print" />
                            </a>
                        </span>
                    </h4>
                </div>
                <div className="wb-tabs">
                    <div className="tabpanels">
                        <ShiftSummaryTab />
                    </div>
                </div>
            </div>
        );
    }
}

class ShiftSummaryTab extends React.Component {
    render() {
        const formattedDate = 'Sun. January 14, 2018';
        const shiftStart = '11:30';
        const shiftEnd = '13:30';
        const calls = '18';
        const casesTouched = '15';
        const surveys = '1';
        const totalOffSystemTime = '00:32:00';
        const hoursClaimed = '01:45:00';

        const hours = [
            {
                start: '11:00',
                description: '11:00 - 11:59',
                responses: '3',
                refusals: '0',
                nocontacts: '3',
                otheroutcomes: '0',
                hourLinkTarget: '#',
            },
            {
                start: '12:00',
                description: '12:00 - 12:59',
                responses: '3',
                refusals: '0',
                nocontacts: '2',
                otheroutcomes: '0',
                hourLinkTarget: '#',
            },
            {
                start: '13:00',
                description: '13:00 - 13:59',
                responses: '0',
                refusals: '1',
                nocontacts: '5',
                otheroutcomes: '1',
                hourLinkTarget: '#',
            },
        ];

        const finalHourLabel = '14:00';
        const renderLink = true;

        const claims = [
            {
                time: '11:30 - 12:15',
                pecode: '1234',
                surveyAcronym: 'RCS',
                surveyName: 'Rabbit Care Survey',
                activity: '9 - Telephone interviewing',
            },
            {
                time: '12:30 - 13:15',
                pecode: '1234',
                surveyAcronym: 'RCS',
                surveyName: 'Rabbit Care Survey',
                activity: '9 - Telephone interviewing',
            },
            {
                time: '13:15 - 13:30',
                pecode: '5678',
                surveyAcronym: 'RCS',
                surveyName: 'Rabbit Care Survey',
                activity: '30 - Admin time',
            },
        ];

        return (
            <details id="day1_int1_sum" open>
                <summary>Summary</summary>
                <div className="row">
                    <div className="col-sm-10 col-md-10">
                        <div className="row">
                            <div className="col-sm-3 col-md-3">
                                <h5 className="mrgn-lft-md">
                                    <i className="fa fa-calendar" />
                                    {formattedDate}
                                </h5>
                            </div>
                            <div className="col-sm-3 col-md-3">
                                <h5>
                                    <i className="fa fa-clock-o" /> {shiftStart} - {shiftEnd}{' '}
                                </h5>
                            </div>
                        </div>
                        <div className="row">
                            <BarGraph
                                hours={hours}
                                finalHourLabel={finalHourLabel}
                                renderLink={renderLink}
                            />
                        </div>
                    </div>
                    <div className="col-sm-2 col-md-2">
                        <div className="text-right mrgn-tp-md">
                            <p>Calls: omgomg {calls}</p>
                            <p>Cases touched: {casesTouched}</p>
                            <p>Surveys: {surveys}</p>
                            <p>Total off system time: {totalOffSystemTime}</p>
                            <p>Hours claimed: {hoursClaimed}</p>
                        </div>
                    </div>
                </div>
                <SummaryCaseWorkDetailsAccordion hours={hours} />
                <PayClaimSummaryAccordion claims={claims} />
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
                    <tr className="brdr-bttm brdr-lft brdr-rght">
                        <td style={{ width: '16.67%' }} className="bg-off-sys ln-hght-30px">
                            &nbsp;
                        </td>
                        <td style={{ width: '0.28%' }} className="zoom bg-off-sys brdr-lft-drk" />
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
                </table>
                <table className="mrgn-lft-md width100">
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
                </table>
                <table className="mrgn-lft-md width100">
                    <BarGraphLine4 hours={this.props.hours} />
                    <BarGraphLine5
                        hours={this.props.hours}
                        finalHourLabel={this.props.finalHourLabel}
                        renderLink={this.props.renderLink}
                    />
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
                <tr className="brdr-bttm brdr-lft-white brdr-rght-white">
                    <td style={this.getDivStyle(this.getWidth1())} className="ln-hght-30px">
                        &nbsp;
                    </td>
                    <td style={this.getDivStyle(this.getWidth2())} className="brdr-lft-drk" />
                    <td style={this.getDivStyle(this.getWidth3())} className="brdr-lft-drk" />
                </tr>
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
        this.props.hours.forEach(() => {
            rows.push(<td style={divStyle}>&nbsp;</td>);
            rows.push(<td style={divStyle} className="brdr-rght" />);
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
                <td className={this.getClassName(i)} colSpan={this.getColSpan(i)}>
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
            rows.push(<SummaryCaseWorkDetailsHourRow hour={element} />);
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
        this.props.claims.forEach(element => {
            rows.push(<PayClaimSummaryRow claim={element} />);
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
        const claim = this.props.claim;
        return (
            <tr>
                <td>{claim.time}</td>
                <td>{claim.pecode}</td>
                <td>{claim.survey}</td>
                <td>{claim.activity}</td>
            </tr>
        );
    }
}

class App extends React.Component {
    render() {
        return <DateAccordion />;
    }
}

export default hot(module)(App); // eslint-disable-line
