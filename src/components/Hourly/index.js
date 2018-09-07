import React from 'react';
import BarGraph from '../BarGraph';
//import accessMethods from '../../codesets/accessMethods';
import outcomeCategories from '../../codesets/outcomeCategories';
//import operationTypes from '../../codesets/operationTypes';
import attemptedVias from '../../codesets/attemptedVias';
//import BarGraph from '/src/components/BarGraph';
//import Container from '/src/components/Container';

class HourlyTab extends React.Component {
    static getAccessMethodClass(isCATI) {
        return isCATI ? '' : ' display-none';
    }

    static getAttemptedViaClass(isCATI) {
        return isCATI ? ' display-none' : '';
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <h5 className="mrgn-lft-md mrgn-bttm-0 capitalize">
                            <i className="fa fa-calendar" />&nbsp;
                            {this.props.formattedDate}
                            <span className="mrgn-lft-lg">
                                <i className="fa fa-clock-o" />{' '}
                                {' ' + this.props.hour.description + ' '}
                            </span>
                        </h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-10 col-md-10 cvc-barGraph">
                        <BarGraph
                            duration="3600"
                            hourkey={this.props.hour.hour}
                            date={this.props.date}
                            username={this.props.username}
                            hour={this.props.hour}
                            calls={this.props.calls}
                            claims={this.props.claims}
                            renderLink={false}
                        />
                    </div>
                    <div className="col-sm-2 col-md-2">
                        <p>Calls: {this.props.hour.totalcalls}</p>
                        <p>Cases touched: {this.props.hour.casestouched}</p>
                        <p>Total off system {this.props.hour.totalOffSystemTime}</p>
                    </div>
                </div>
                <HourlyCaseWorkDetails
                    calls={this.props.calls}
                    isCATI={this.props.isCATI}
                    uniqueKey={
                        this.props.date + '_' + this.props.username + '_' + this.props.hour.hour
                    }
                />
            </div>
        );
    }
}

class HourlyCaseWorkDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showWhiteSpots: true,
        };

        this.handleCheckClicked = this.handleCheckClicked.bind(this);
    }

    handleCheckClicked(e) {
        this.setState({
            showWhiteSpots: e.target.checked,
        });
    }

    render() {
        const rows = [];

        this.props.calls.forEach(element => {
            if (element.outcomecategory === outcomeCategories.PADDING) {
                // do nothing
            } else if (element.outcomecategory === outcomeCategories.WHITE_SPOT) {
                if (this.state.showWhiteSpots) {
                    rows.push(
                        <WhiteSpotRow
                            key={element.id}
                            whitespot={element}
                            isCATI={this.props.isCATI}
                        />
                    );
                }
            } else {
                rows.push(
                    <AttemptRow key={element.id} attempt={element} isCATI={this.props.isCATI} />
                );
            }
        });

        return (
            <details className="acc-group mrgn-bttm-md mrgn-tp-md cvc-mdl">
                <summary className="panel-heading-collapsible pddng-sm">
                    View case work details
                </summary>
                <div>
                    <table className="wb-tables table table-striped mrgn-bttm-0 view-details">
                        <thead>
                            <tr>
                                <th />
                                <th>
                                    Outcome<br />
                                    <div className="mrgn-tp-sm no-wrap">
                                        <input
                                            id={this.props.uniqueKey + '_show-off-sys1'}
                                            className="show-off-sys"
                                            type="checkbox"
                                            checked={this.state.showWhiteSpots}
                                            onChange={this.handleCheckClicked}
                                        />
                                        <label
                                            htmlFor={this.props.uniqueKey + '_show-off-sys1'}
                                            className="mrgn-lft-sm"
                                        >
                                            View off system time
                                        </label>
                                    </div>
                                </th>
                                <th>Survey</th>
                                <th>Cycle</th>
                                <th>Operation</th>
                                <th>Case ID</th>
                                <th>
                                    Start time<br />
                                    <span className="text-normal">
                                        (<abbr title="hours, minutes and seconds">hh:mm:ss</abbr>)
                                    </span>
                                </th>
                                <th>
                                    End time<br />
                                    <span className="text-normal">
                                        (<abbr title="hours, minutes and seconds">hh:mm:ss</abbr>)
                                    </span>
                                </th>
                                <th>
                                    Interview<br />length<br />
                                    <span className="text-normal">
                                        (<abbr title="hours, minutes and seconds">hh:mm:ss</abbr>)
                                    </span>
                                </th>
                                <th>
                                    Total<br />system time<br />
                                    <span className="text-normal">
                                        (<abbr title="hours, minutes and seconds">hh:mm:ss</abbr>)
                                    </span>
                                </th>
                                <th className={HourlyTab.getAccessMethodClass(this.props.isCATI)}>
                                    Access<br />method
                                </th>
                                <th className={HourlyTab.getAttemptedViaClass(this.props.isCATI)}>
                                    Attempted<br />via
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

class WhiteSpotRow extends React.Component {
    render() {
        return (
            <tr id={this.props.whitespot.hrefId}>
                <td className="bg-off-sys" />
                <td>Off system time</td>
                <td />
                <td />
                <td>
                    <a href="#" />
                </td>
                <td />
                <td>{this.props.whitespot.starttime}</td>
                <td>{this.props.whitespot.endtime}</td>
                <td />
                <td>{this.props.whitespot.duration}</td>
                <td className={HourlyTab.getAccessMethodClass(this.props.isCATI)} />
                <td className={HourlyTab.getAttemptedViaClass(this.props.isCATI)} />
            </tr>
        );
    }
}

class AttemptRow extends React.Component {
    getBGColourClassName() {
        var className;

        if (this.props.attempt.outcomecategory === outcomeCategories.NO_CONTACTS) {
            className += ' bg-nocon-0';
        } else if (this.props.attempt.outcomecategory === outcomeCategories.OTHER_OUTCOMES) {
            className += ' bg-other-0';
        } else if (this.props.attempt.outcomecategory === outcomeCategories.RESPONSES) {
            className += ' bg-res-0';
        } else if (this.props.attempt.outcomecategory === outcomeCategories.REFUSALS) {
            className += ' bg-ref-0';
        }

        return className;
    }

    getPlusMinus(value) {
        if (value.outlier) {
            if (value.plusminus > 0) {
                return '(+' + value.plusminus + ' min)';
            } else {
                return '(' + value.plusminus + ' min)';
            }
        } else {
            return '';
        }
    }

    getIconClassName() {
        var className = 'fa';

        if (this.props.attempt.attemptedvia === attemptedVias.FIELD) {
            className += ' fa-user';
        } else if (this.props.attempt.attemptedvia === attemptedVias.PHONE) {
            className += ' fa-phone';
        }

        return className;
    }

    render() {
        return (
            <tr id={this.props.attempt.hrefId}>
                <td className={this.getBGColourClassName()} />
                <td>{this.props.attempt.outcome}</td>
                <td>{this.props.attempt.survey}</td>
                <td>{this.props.attempt.cycle}</td>
                <td>
                    <abbr title={this.props.attempt.operation.text}>
                        {this.props.attempt.operation.value}
                    </abbr>
                </td>
                <td>
                    <a href="#">{this.props.attempt.caseId}</a>
                </td>
                <td>{this.props.attempt.starttime}</td>
                <td>{this.props.attempt.endtime}</td>
                <td>
                    {this.props.attempt.interviewlength.length}
                    <br />
                    <span className="text-outlier">
                        {this.getPlusMinus(this.props.attempt.interviewlength)}
                    </span>
                </td>
                <td>
                    {this.props.attempt.totalsystemtime.length}
                    <br />
                    <span className="text-outlier">
                        {this.getPlusMinus(this.props.attempt.totalsystemtime)}
                    </span>
                </td>
                <td className={HourlyTab.getAccessMethodClass(this.props.isCATI)}>
                    <abbr title={this.props.attempt.accessmethod.text}>
                        {this.props.attempt.accessmethod.value}
                    </abbr>
                </td>
                <td className={HourlyTab.getAttemptedViaClass(this.props.isCATI)}>
                    <i className={this.getIconClassName()} />
                </td>
            </tr>
        );
    }
}

export default HourlyTab;
