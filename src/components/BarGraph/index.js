import React from 'react';
import ReactTooltip from 'react-tooltip';
import claimTypes from '../../codesets/claimTypes';
import outcomeCategories from '../../codesets/outcomeCategories';

class BarGraph extends React.Component {
    render() {
        return (
            <div className="col-sm-12 col-md-12 cvc-barGraph mrgn-bttm-md">
                <br />
                <BarGraphLine1
                    duration={this.props.duration}
                    claims={this.props.claims}
                    hourkey={this.props.hourkey}
                    date={this.props.date}
                    username={this.props.username}
                />
                <BarGraphLine2
                    duration={this.props.duration}
                    calls={this.props.calls}
                    hourkey={this.props.hourkey}
                    date={this.props.date}
                    username={this.props.username}
                />
                <BarGraphLine3
                    duration={this.props.duration}
                    claims={this.props.claims}
                    hourkey={this.props.hourkey}
                    date={this.props.date}
                    username={this.props.username}
                />
                <table className="mrgn-lft-md width100">
                    <tbody>
                        <BarGraphLine4 hours={this.props.hours} />
                        <BarGraphLine5
                            hours={this.props.hours}
                            hourkey={this.props.hourkey}
                            finalHourLabel={this.props.finalHourLabel}
                            renderLink={this.props.renderLink}
                            handleTabLinkSelected={this.props.handleTabLinkSelected}
                        />
                    </tbody>
                </table>
                <CallTooltips
                    calls={this.props.calls}
                    hourkey={this.props.hourkey}
                    date={this.props.date}
                    username={this.props.username}
                />
                <ClaimTooltips
                    claims={this.props.claims}
                    hourkey={this.props.hourkey}
                    date={this.props.date}
                    username={this.props.username}
                />
            </div>
        );
    }
}

class CallTooltips extends React.Component {
    //TODO: this is duplicated in BarGraphLine2
    getTooltipID(call) {
        return (
            'call_' +
            this.props.date +
            '_' +
            this.props.username +
            '_' +
            this.props.hourkey +
            call.id +
            '-tt'
        );
    }

    render() {
        var tooltips = [];
        this.props.calls.forEach(call => {
            if (call.outcomecategory === outcomeCategories.PADDING) {
                // do nothing
            } else if (call.outcomecategory === outcomeCategories.WHITE_SPOT) {
                tooltips.push(
                    <ReactTooltip
                        key={call.id}
                        id={this.getTooltipID(call)}
                        type="light"
                        effect="solid"
                    >
                        <span>
                            <strong>Start time</strong>
                            <br />
                            {call.starttime}
                            <br />
                            <strong>End time</strong>
                            <br />
                            {call.endtime}
                            <br />
                            <strong>Off system time</strong>
                            <br />
                            {call.duration}
                        </span>
                    </ReactTooltip>
                );
            } else {
                tooltips.push(
                    <ReactTooltip
                        key={call.id}
                        id={this.getTooltipID(call)}
                        type="light"
                        effect="solid"
                    >
                        <span>
                            <strong>Survey</strong>
                            <br />
                            {call.survey}
                            <br />
                            <strong>PE code</strong>
                            <br />
                            {call.pecode}
                            <br />
                            <strong>Outcome</strong>
                            <br />
                            {call.outcome}
                            <br />
                            <strong>Total system time</strong>
                            <br />
                            {call.totalsystemtime}
                        </span>
                    </ReactTooltip>
                );
            }
        });
        return <div>{tooltips}</div>;
    }
}

class ClaimTooltips extends React.Component {
    // TODO: this is duplicated in BarGraphLine3
    getTooltipID(claim) {
        return (
            'claim_' +
            this.props.date +
            '_' +
            this.props.username +
            '_' +
            this.props.hourkey +
            claim.id +
            '-tt'
        );
    }

    render() {
        var tooltips = [];
        this.props.claims.forEach(claim => {
            if (claim.claimtype !== claimTypes.OFF_SYSTEM_TIME) {
                tooltips.push(
                    <ReactTooltip
                        key={claim.id}
                        id={this.getTooltipID(claim)}
                        type="light"
                        effect="solid"
                    >
                        <span>
                            <strong>Survey</strong>
                            <br />
                            {claim.surveyName}
                            <br />
                            <strong>PE code</strong>
                            <br />
                            {claim.pecode}
                            <br />
                            <strong>Activity</strong>
                            <br />
                            {claim.activity}
                            <br />
                            <strong>Duration</strong>
                            <br />
                            {claim.starttime + ' - ' + claim.endtime}
                        </span>
                    </ReactTooltip>
                );
            }
        });
        return <div>{tooltips}</div>;
    }
}

class BarGraphLine1 extends React.Component {
    getClassName(claim, index) {
        var className = '';

        // is the first element
        if (index === 0) {
            className += 'ln-hght-30px';

            // if the first element is padding, bar goes on right
            if (claim.claimtype === claimTypes.OFF_SYSTEM_TIME) {
                className += ' brdr-rght-drk';
            } else {
                className += ' brdr-lft-drk';
            }
        }

        // is the last element
        if (index === this.props.claims.length - 1) {
            // if the last element is padding, bar goes on left
            if (claim.claimtype === claimTypes.OFF_SYSTEM_TIME) {
                className += ' brdr-lft-drk';
            } else {
                className += ' brdr-rght-drk';
            }
        }

        return className;
    }

    getWidth(claim) {
        var claimduration = claim.durations[this.props.hourkey];
        var calculatedWidth = 0;
        if (this.props.duration > 0) {
            calculatedWidth = ((claimduration / this.props.duration) * 100).toFixed(2);
        }
        return { width: calculatedWidth + '%' };
    }

    render() {
        const rows = [];
        for (var i = 0; i < this.props.claims.length; i++) {
            var claim = this.props.claims[i];
            rows.push(
                <td
                    key={claim.id}
                    style={this.getWidth(claim)}
                    className={this.getClassName(claim, i)}
                >
                    &nbsp;
                </td>
            );
        }

        return (
            <table className="row_flags mrgn-lft-md brdr-lft-white brdr-rght-white width100">
                <tbody>
                    <tr className="brdr-bttm brdr-lft-white brdr-rght-white">{rows}</tr>
                </tbody>
            </table>
        );
    }
}

// this line of the bargraph renders all of the calls / visits for the given hour / shift
class BarGraphLine2 extends React.Component {
    //TODO: this is duplicated in CallTooltips
    getTooltipID(call) {
        return (
            'call_' +
            this.props.date +
            '_' +
            this.props.username +
            '_' +
            this.props.hourkey +
            call.id +
            '-tt'
        );
    }

    countOutcomeCategories() {
        var count = 0;
        var prevCall = null;

        this.props.calls.forEach(element => {
            if (element.outcomecategory !== outcomeCategories.WHITE_SPOT && element.outcomecategory !== outcomeCategories.PADDING) {
                if (prevCall === null) {
                    element["categorycount"] = count;
                    prevCall = element;
                } else {
                    if (prevCall.outcomecategory === element.outcomecategory) {
                        if (element.outcomecategory === outcomeCategories.RESPONSES || element.outcomecategory === outcomeCategories.REFUSALS) {
                            switch(prevCall.categorycount) {
                                case 0: count = 1; break;
                                case 1: count = 0; break;
                            } 
                        } else {
                            switch(prevCall.categorycount) {
                                case 0: count = 1; break;
                                case 1: count = 2; break;
                                case 2: count = 0; break;
                            }
                        }
                        element["categorycount"] = count;
                    } else {
                        count = 0;
                        element["categorycount"] = count;
                    }
                    prevCall = element;
                }
            }  
        });
    }

    getClassName(attempt, index) {
        var className = '';
        if (attempt.outcomecategory !== outcomeCategories.PADDING) {
            className += 'zoom';
        }

        // is the first element
        if (index === 0) {
            className += ' ln-hght-30px';

            if (attempt.outcomecategory === outcomeCategories.PADDING) {
                className += ' brdr-rght-drk';
            } else {
                className += ' brdr-lft-drk';
            }
        }

        // is the last element
        if (index === this.props.calls.length - 1) {
            if (attempt.outcomecategory === outcomeCategories.PADDING) {
                className += ' brdr-lft-drk';
            } else {
                className += ' brdr-rght-drk';
            }
        }

        if (attempt.outcomecategory === outcomeCategories.RESPONSES) {
            className += ' bg-res-' + attempt.categorycount;
        } else if (attempt.outcomecategory === outcomeCategories.REFUSALS) {
            className += ' bg-ref-' + attempt.categorycount;
        } else if (attempt.outcomecategory === outcomeCategories.NO_CONTACTS) {
            className += ' bg-nocon-' + attempt.categorycount;
        } else if (attempt.outcomecategory === outcomeCategories.OTHER_OUTCOMES) {
            className += ' bg-other-' + attempt.categorycount;
        } else {
            className += ' bg-off-sys';
        }

        return className;
    }

    getWidth(attempt) {
        var attemptduration = attempt.durations[this.props.hourkey];
        var calculatedWidth = 0;
        if (this.props.duration > 0) {
            calculatedWidth = ((attemptduration / this.props.duration) * 100).toFixed(2);
        }
        return { width: calculatedWidth + '%' };
    }

    render() {
        {this.countOutcomeCategories()}
        const rows = [];
        for (var i = 0; i < this.props.calls.length; i++) {
            var call = this.props.calls[i];
            rows.push(
                <td
                    key={call.id}
                    style={this.getWidth(call)}
                    className={this.getClassName(call, i)}
                    data-tip
                    data-for={this.getTooltipID(call)}
                >
                    {i === 0 ? '\u00A0' : ''}
                </td>
            );
        }

        return (
            <table className="mrgn-lft-md width100">
                <tbody>
                    <tr className="brdr-bttm brdr-lft brdr-rght">{rows}</tr>
                </tbody>
            </table>
        );
    }
}

// this line of the bargraph renders all of the pay claims for the given time / period
class BarGraphLine3 extends React.Component {
    getClassName(claim, index) {
        var className = '';

        if (claim.claimtype !== claimTypes.OFF_SYSTEM_TIME) {
            className += 'zoom';
        }

        // is the first element
        if (index === 0) {
            className += ' ln-hght-30px';

            // if the first element is padding, bar goes on right
            if (claim.claimtype === claimTypes.OFF_SYSTEM_TIME) {
                className += ' brdr-rght-drk';
            } else {
                className += ' brdr-lft-drk';
            }
        }

        // is the last element
        if (index === this.props.claims.length - 1) {
            // if the last element is padding, bar goes on left
            if (claim.claimtype === claimTypes.OFF_SYSTEM_TIME) {
                className += ' brdr-lft-drk';
            } else {
                className += ' brdr-rght-drk';
            }
        }

        if (claim.claimtype === claimTypes.OFF_SYSTEM_TIME) {
            className += ' bg-off-sys';
        } else if (claim.claimtype === claimTypes.CLAIMED) {
            className += ' bg-claimed';
        } else if (claim.claimtype === claimTypes.CLAIMED_OTHER) {
            className += ' bg-other-claim';
        } else if (claim.claimtype === claimTypes.OTHER_TASK) {
            className += ' bg-other-task';
        }

        return className;
    }

    getWidth(claim) {
        var claimduration = claim.durations[this.props.hourkey];
        var calculatedWidth = 0;
        if (this.props.duration > 0) {
            calculatedWidth = ((claimduration / this.props.duration) * 100).toFixed(2);
        }
        return { width: calculatedWidth + '%' };
    }

    // TODO: this is duplicated in ClaimTooltips
    getTooltipID(claim) {
        return (
            'claim_' +
            this.props.date +
            '_' +
            this.props.username +
            '_' +
            this.props.hourkey +
            claim.id +
            '-tt'
        );
    }

    render() {
        const rows = [];
        for (var i = 0; i < this.props.claims.length; i++) {
            var claim = this.props.claims[i];
            rows.push(
                <td
                    key={claim.id}
                    style={this.getWidth(claim)}
                    className={this.getClassName(claim, i)}
                    data-tip
                    data-for={this.getTooltipID(claim)}
                >
                    &nbsp;
                </td>
            );
        }

        return (
            <table className="mrgn-lft-md width100">
                <tbody>
                    <tr className="brdr-lft brdr-rght brdr-bttm">{rows}</tr>
                </tbody>
            </table>
        );
    }
}

// this line of the bargraph renders the little grey dividers marking the hours
class BarGraphLine4 extends React.Component {
    render() {
        if (this.props.hours) {
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
        } else {
            return (
                <tr className="brdr-lft brdr-rght text-center">
                    <td style={{ width: '50%' }}>&nbsp;</td>
                    <td style={{ width: '50%' }}>&nbsp;</td>
                </tr>
            );
        }
    }
}

// this line of the bargraph renders the hourly labels / links at the bottom
class BarGraphLine5 extends React.Component {
    render() {
        if (this.props.hours) {
            const rows = [];
            var hourTabIndex = 0;
            for (var i = 0; i < this.props.hours.length; i++) {
                if (this.props.hours[i].hasAttempt) {
                    hourTabIndex++;
                }
                rows.push(
                    <BarGraphLine5TD
                        key={this.props.hours[i].start}
                        isFirstHour={i === 0}
                        hourTabIndex={hourTabIndex}
                        hour={this.props.hours[i]}
                        renderLink={this.props.renderLink}
                        handleTabLinkSelected={this.props.handleTabLinkSelected}
                    />
                );
            }
            return (
                <tr>
                    {rows}
                    <td className="text-right">{this.props.finalHourLabel}</td>
                </tr>
            );
        } else {
            const startHourLabel = this.props.hourkey + ':00';
            const endHourLabel = this.props.hourkey + 1 + ':00';
            return (
                <tr>
                    <td>{startHourLabel}</td>
                    <td className={'text-right'}>{endHourLabel}</td>
                </tr>
            );
        }
    }
}

class BarGraphLine5TD extends React.Component {
    constructor(props) {
        super(props);
        this.selectTab = this.selectTab.bind(this);
    }

    selectTab(e) {
        e.preventDefault();
        this.props.handleTabLinkSelected(this.props.hourTabIndex);
    }

    getClassName(isFirstHour) {
        return isFirstHour ? 'ln-hght-30px' : 'text-center';
    }

    getColSpan(isFirstHour) {
        return isFirstHour ? '1' : '2';
    }

    getTDValue(hour, renderLink) {
        if (renderLink && hour.hasAttempt) {
            return (
                <a href="#" onClick={this.selectTab}>
                    {hour.start}
                </a>
            );
        } else {
            return hour.start;
        }
    }

    render() {
        return (
            <td
                className={this.getClassName(this.props.isFirstHour)}
                colSpan={this.getColSpan(this.props.isFirstHour)}
            >
                {this.getTDValue(this.props.hour, this.props.renderLink)}
            </td>
        );
    }
}

export default BarGraph;
