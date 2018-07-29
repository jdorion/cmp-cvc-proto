import React from 'react';
import claimTypes from '../../codesets/claimTypes';
import outcomeCategories from '../../codesets/outcomeCategories';

class BarGraph extends React.Component {
    render() {
        return (
            <div className="col-sm-12 col-md-12 cvc-barGraph mrgn-bttm-md">
                <br />
                <BarGraphLine1 shiftStart={this.props.shiftStart} shiftEnd={this.props.shiftEnd} />
                <BarGraphLine2
                    duration={this.props.duration}
                    calls={this.props.calls}
                    hourkey={this.props.hourkey}
                />
                <BarGraphLine3
                    duration={this.props.duration}
                    claims={this.props.claims}
                    hourkey={this.props.hourkey}
                />
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

// this line of the bargraph renders all of the calls / visits for the given hour / shift
class BarGraphLine2 extends React.Component {
    getClassName(attempt, index) {
        var className = 'zoom';

        // is the first element
        if (index === 0) {
            className += ' brdr-rght-drk ln-hght-30px';
        }

        // is the last element
        if (index === this.props.calls.length - 1) {
            className += ' brdr-lft-drk';
        }

        if (attempt.attempt) {
            if (attempt.outcomecategory === outcomeCategories.RESPONSES) {
                className += ' bg-res';
            } else if (attempt.outcomecategory === outcomeCategories.REFUSALS) {
                className += ' bg-ref';
            } else if (attempt.outcomecategory === outcomeCategories.NO_CONTACTS) {
                className += ' bg-nocon';
            } else if (attempt.outcomecategory === outcomeCategories.OTHER_OUTCOMES) {
                className += ' bg-other';
            }
        } else {
            className += ' bg-off-sys';
        }

        return className;
    }

    getWidth(attemptduration) {
        var calculatedWidth = 0;
        if (this.props.duration > 0) {
            calculatedWidth = ((attemptduration / this.props.duration) * 100).toFixed(2);
        }
        return { width: calculatedWidth + '%' };
    }

    render() {
        const rows = [];
        for (var i = 0; i < this.props.calls.length; i++) {
            var call = this.props.calls[i];
            if (i === 0) {
                rows.push(
                    <td
                        key={call.id}
                        style={this.getWidth(call.durationSeconds)}
                        className={this.getClassName(call, i)}
                    >
                        &nbsp;
                    </td>
                );
            } else {
                rows.push(
                    <td
                        key={call.id}
                        style={this.getWidth(call.durationSeconds)}
                        className={this.getClassName(call, i)}
                    />
                );
            }
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
            className += ' brdr-rght-drk ln-hght-30px';
        }

        // is the last element
        if (index === this.props.claims.length - 1) {
            className += ' brdr-lft-drk';
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

    render() {
        const rows = [];
        for (var i = 0; i < this.props.claims.length; i++) {
            rows.push(
                <td
                    key={this.props.claims[i].id}
                    style={this.getWidth(this.props.claims[i])}
                    className={this.getClassName(this.props.claims[i], i)}
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

// this line of the bargraph renders the hourly labels / links at the bottom
class BarGraphLine5 extends React.Component {
    getClassName(index) {
        return index === 0 ? 'ln-hght-30px' : 'text-center';
    }

    getColSpan(index) {
        return index === 0 ? '1' : '2';
    }

    getTDValue(hour, renderLink) {
        if (renderLink && hour.hasAttempt) {
            return <a href={'#' + hour.id}>{hour.start}</a>;
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

export default BarGraph;
