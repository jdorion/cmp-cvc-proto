import React from 'react';
import BarGraph from '../BarGraph';
import Container from '../Container';
import claimTypes from '../../codesets/claimTypes';

class ShiftSummaryTab extends React.Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-10 col-md-10">
                        <div className="row">
                            <div className="col-md-12">
                                <h5 className="mrgn-lft-md mrgn-bttm-0 capitalize">
                                    <i className="fa fa-calendar"/>&nbsp;
                                    {this.props.formattedDate}
                                    <span className="mrgn-lft-lg"><i className="fa fa-clock-o" /> {this.props.shift.shiftStart} -{' '}
                                    {this.props.shift.shiftEnd}</span>
                                </h5>
                            </div>
                        </div>
                        <div className="row">
                            <BarGraph
                                duration={this.props.shift.durationSeconds}
                                hourkey="summary"
                                date={this.props.date}
                                username={this.props.shift.username}
                                hours={this.props.shift.hours}
                                calls={this.props.shift.calls}
                                claims={this.props.shift.claims}
                                finalHourLabel={this.props.shift.finalHourLabel}
                                renderLink={this.props.shift.renderLink}
                                handleTabLinkSelected={this.props.handleTabLinkSelected}
                            />
                        </div>
                    </div>
                    <div className="col-sm-2 col-md-2">
                        <div className="mrgn-tp-md">
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
                    handleTabLinkSelected={this.props.handleTabLinkSelected}
                />
                <PayClaimSummaryAccordion
                    claims={this.props.shift.claims}
                    isPrintView={this.props.isPrintView}
                />
            </div>
        );
    }
}

class SummaryCaseWorkDetailsAccordion extends React.Component {
    render() {
        const rows = [];
        var hourIndex = 0;
        for (var i = 0; i < this.props.hours.length; i++) {
            var element = this.props.hours[i];
            if (element.hasAttempt) {
                hourIndex++; /* +1 bc shift summary is always first */
                rows.push(
                    <SummaryCaseWorkDetailsHourRow
                        key={element.start}
                        hour={element}
                        hourIndex={hourIndex}
                        handleTabLinkSelected={this.props.handleTabLinkSelected}
                    />
                );
            }
        }

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
                                    <span className="bg-res-0 display-inline-block pddng-8px" />{' '}
                                    Responses
                                </th>
                                <th className="text-right width20">
                                    <span className="bg-ref-0 display-inline-block pddng-8px" />{' '}
                                    Refusals
                                </th>
                                <th className="text-right width20">
                                    <span className="bg-nocon-0 display-inline-block pddng-8px" /> No
                                    contacts
                                </th>
                                <th className="text-right width20">
                                    <span className="bg-other-0 display-inline-block pddng-8px" />{' '}
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
    constructor(props) {
        super(props);
        this.selectTab = this.selectTab.bind(this);
    }

    selectTab(e) {
        e.preventDefault();
        this.props.handleTabLinkSelected(this.props.hourIndex);
    }

    render() {
        const hour = this.props.hour;
        return (
            <tr>
                <td>
                    <a href="#" onClick={this.selectTab}>
                        {hour.description}
                    </a>
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
                <td>{this.props.claim.starttime + ' - ' + this.props.claim.endtime}</td>
                <td>{this.props.claim.pecode}</td>
                <td>{this.props.claim.surveyAcronym}</td>
                <td>{this.props.claim.activity}</td>
            </tr>
        );
    }
}

export default ShiftSummaryTab;
