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
                    <div className="col-sm-3 col-md-3">
                        <h5 className="mrgn-lft-md">
                            <i className="fa fa-calendar" /> {this.props.formattedDate}
                        </h5>
                    </div>
                    <div className="col-sm-3 col-md-3">
                        <h5>
                            <i className="fa fa-clock-o" />
                            {' ' + this.props.hour.description + ' '}
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
                    <div className="col-sm-2 col-md-2 text-right">
                        <p>Calls: {this.props.hour.totalcalls}</p>
                        <p>Cases touched: {this.props.hour.casestouched}</p>
                        <p>Total off system {this.props.hour.totalOffSystemTime}</p>
                    </div>
                </div>
                <HourlyCaseWorkDetails calls={this.props.calls} isCATI={this.props.isCATI} />
            </div>
        );
    }
}

class HourlyCaseWorkDetails extends React.Component {
    render() {
        const rows = [];

        this.props.calls.forEach(element => {
            if (element.attempt) {
                rows.push(
                    <AttemptRow key={element.id} attempt={element} isCATI={this.props.isCATI} />
                );
            } else {
                rows.push(
                    <WhiteSpotRow key={element.id} whitespot={element} isCATI={this.props.isCATI} />
                );
            }
        });

        return (
            <details className="acc-group mrgn-bttm-md mrgn-tp-md cvc-mdl">
                <summary className="panel-heading-collapsible pddng-sm">
                    View case work details
                </summary>
                <div>
                    <table className="table table-striped mrgn-bttm-0 view-details">
                        <thead>
                            <tr>
                                <th />
                                <th>
                                    Outcome<br />
                                    <label htmlFor="show-off-sys1" className="mrgn-lft-sm">
                                        View off system time
                                    </label>
                                </th>
                                <th>Survey</th>
                                <th className="text-right">Cycle</th>
                                <th className="text-right">Operation</th>
                                <th className="text-right">Case Id</th>
                                <th className="text-right">
                                    Start time<br />
                                    <span className="text-normal">
                                        (<abbr title="hours, minutes and seconds">hh:mm:ss</abbr>)
                                    </span>
                                </th>
                                <th className="text-right">
                                    End time<br />
                                    <span className="text-normal">
                                        (<abbr title="hours, minutes and seconds">hh:mm:ss</abbr>)
                                    </span>
                                </th>
                                <th className="text-right">
                                    Interview<br />length<br />
                                    <span className="text-normal">
                                        (<abbr title="hours, minutes and seconds">hh:mm:ss</abbr>)
                                    </span>
                                </th>
                                <th className="text-right">
                                    Total<br />system time<br />
                                    <span className="text-normal">
                                        (<abbr title="hours, minutes and seconds">hh:mm:ss</abbr>)
                                    </span>
                                </th>
                                <th
                                    className={
                                        'text-right' +
                                        HourlyTab.getAccessMethodClass(this.props.isCATI)
                                    }
                                >
                                    Access<br />method
                                </th>
                                <th
                                    className={
                                        'text-right' +
                                        HourlyTab.getAttemptedViaClass(this.props.isCATI)
                                    }
                                >
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
            <tr>
                <td>
                    <span className="bg-off-sys pddng-8px brdr-all" />
                </td>
                <td>Off system time</td>
                <td />
                <td className="text-right" />
                <td className="text-right">
                    <a href="#" />
                </td>
                <td className="text-right" />
                <td className="text-right">{this.props.whitespot.starttime}</td>
                <td className="text-right">{this.props.whitespot.endtime}</td>
                <td className="text-right" />
                <td className="text-right">{this.props.whitespot.duration}</td>
                <td className={'text-right' + HourlyTab.getAccessMethodClass(this.props.isCATI)} />
                <td className={'text-center' + HourlyTab.getAttemptedViaClass(this.props.isCATI)} />
            </tr>
        );
    }
}

class AttemptRow extends React.Component {
    getBGColourClassName() {
        var className = 'pddng-8px brdr-all';

        if (this.props.attempt.outcomecategory === outcomeCategories.NO_CONTACTS) {
            className += ' bg-nocon';
        } else if (this.props.attempt.outcomecategory === outcomeCategories.OTHER_OUTCOMES) {
            className += ' bg-other';
        } else if (this.props.attempt.outcomecategory === outcomeCategories.RESPONSES) {
            className += ' bg-res';
        } else if (this.props.attempt.outcomecategory === outcomeCategories.REFUSALS) {
            className += ' bg-ref';
        }

        return className;
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
            <tr>
                <td>
                    <span className={this.getBGColourClassName()} />
                </td>
                <td>{this.props.attempt.outcome}</td>
                <td>{this.props.attempt.survey}</td>
                <td className="text-right">{this.props.attempt.cycle}</td>
                <td className="text-right">
                    <abbr title={this.props.attempt.operation.text}>
                        {this.props.attempt.operation.value}
                    </abbr>
                </td>
                <td className="text-right">
                    <a href="#">{this.props.attempt.caseId}</a>
                </td>
                <td className="text-right">{this.props.attempt.starttime}</td>
                <td className="text-right">{this.props.attempt.endtime}</td>
                <td className="text-right">{this.props.attempt.interviewlength}</td>
                <td className="text-right">{this.props.attempt.totalsystemtime}</td>
                <td className={'text-right' + HourlyTab.getAccessMethodClass(this.props.isCATI)}>
                    <abbr title={this.props.attempt.accessmethod.text}>
                        {this.props.attempt.accessmethod.value}
                    </abbr>
                </td>
                <td className={'text-right' + HourlyTab.getAttemptedViaClass(this.props.isCATI)}>
                    <i className={this.getIconClassName()} />
                </td>
            </tr>
        );
    }
}

export default HourlyTab;
