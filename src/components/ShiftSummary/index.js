import React from 'react';
import BarGraph from '/src/components/BarGraph';
import Container from '/src/components/Container';
import claimTypes from '../../codesets/claimTypes';

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
                                    {this.props.formattedDate}
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
                                duration={this.props.shift.durationSeconds}
                                hourkey="summary"
                                hours={this.props.shift.hours}
                                calls={this.props.shift.calls}
                                claims={this.props.shift.claims}
                                finalHourLabel={this.props.shift.finalHourLabel}
                                renderLink={this.props.shift.renderLink}
                            />
                        </div>
                    </div>
                    <div className="col-sm-2 col-md-2">
                        <div className="text-right mrgn-tp-md">
                            <p>Calls: {this.props.shift.callsTaken}</p>
                            <p>Cases touched: {this.props.shift.casesTouched}</p>
                            <p>Surveys: {this.props.shift.surveys}</p>
                            <p>Total off system time: {this.props.shift.totalOffSystemTime}</p>
                            <p>Hours claimed: {this.props.shift.hoursClaimed}</p>
                        </div>
                    </div>
                </div>
                <SummaryCaseWorkDetailsAccordion
                    hours={this.props.shift.hours}
                    isPrintView={this.props.isPrintView}
                />
                <PayClaimSummaryAccordion
                    claims={this.props.shift.claims}
                    isPrintView={this.props.isPrintView}
                />
            </details>
        );
    }
}

class SummaryCaseWorkDetailsAccordion extends React.Component {
    render() {
        const rows = [];
        this.props.hours.forEach(element => {
            if (element.hasAttempt) {
                rows.push(<SummaryCaseWorkDetailsHourRow key={element.start} hour={element} />);
            }
        });

        return (
            <Container
                title={'View case work details'}
                isPrintView={this.props.isPrintView}
                includeH3={false}
                isOpen={false}
            >
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
            </Container>
        );
    }
}

class SummaryCaseWorkDetailsHourRow extends React.Component {
    render() {
        const hour = this.props.hour;
        return (
            <tr>
                <td>
                    <a href={'#' + hour.id}>{hour.description}</a>
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
            if (element.claimtype !== claimTypes.OFF_SYSTEM_TIME) {
                rows.push(<PayClaimSummaryRow key={element.id.toString()} claim={element} />);
            }
        });

        return (
            <Container
                title={'Pay claim summary'}
                isPrintView={this.props.isPrintView}
                includeH3={false}
                isOpen={false}
            >
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
            </Container>
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

export default ShiftSummaryTab;
