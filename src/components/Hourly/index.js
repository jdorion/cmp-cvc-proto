import React from 'react';
import accessMethods from '../../codesets/accessMethods';
import outcomeCategories from '../../codesets/outcomeCategories';
import operationTypes from '../../codesets/operationTypes';
import attemptedVias from '../../codesets/attemptedVias';
//import BarGraph from '/src/components/BarGraph';
//import Container from '/src/components/Container';

class HourlyTab extends React.Component {
    render() {
        const calls = [
            {
                id: '1',
                attempt: false,
                starttime: '11:30:00',
                endtime: '11:30:30',
                duration: '00:00:30',
            },
            {
                id: '2',
                attempt: true,
                outcomecategory: outcomeCategories.NO_CONTACTS,
                outcome: '105 - Recorded message service',
                survey: 'Rabbit Care',
                cycle: '05-17',
                operation: operationTypes.IE,
                caseid: '123465',
                starttime: '11:30:30',
                endtime: '11:31:00',
                interviewlength: '00:00:00',
                totalsystemtime: '00:00:30',
                accessmethod: accessMethods.CS,
                attemptedvia: attemptedVias.PHONE,
            },
            {
                id: '3',
                attempt: false,
                starttime: '11:31:00',
                endtime: '11:31:30',
                duration: '00:00:30',
            },
            {
                id: '4',
                attempt: true,
                outcomecategory: outcomeCategories.NO_CONTACTS,
                outcome: '105 - Recorded message service',
                survey: 'Rabbit Care',
                cycle: '05-17',
                operation: operationTypes.IE,
                caseid: '111213',
                starttime: '11:31:30',
                endtime: '11:32:00',
                interviewlength: '00:00:00',
                totalsystemtime: '00:00:30',
                accessmethod: accessMethods.CS,
                attemptedvia: attemptedVias.PHONE,
            },
            {
                id: '5',
                attempt: false,
                starttime: '11:32:00',
                endtime: '11:32:15',
                duration: '00:00:15',
            },
            {
                id: '6',
                attempt: true,
                outcomecategory: outcomeCategories.RESPONSES,
                outcome: '400 - Complete',
                survey: 'Rabbit Care',
                cycle: '05-17',
                operation: operationTypes.IE,
                caseid: '141516',
                starttime: '11:32:15',
                endtime: '11:40:00',
                interviewlength: '00:07:00',
                totalsystemtime: '00:07:45',
                accessmethod: accessMethods.CSA,
                attemptedvia: attemptedVias.PHONE,
            },
            {
                id: '7',
                attempt: false,
                starttime: '11:40:00',
                endtime: '11:40:30',
                duration: '00:00:30',
            },
            {
                id: '8',
                attempt: true,
                outcomecategory: outcomeCategories.NO_CONTACTS,
                outcome: '105 - Recorded message service',
                survey: 'Rabbit Care',
                cycle: '05-17',
                operation: operationTypes.IE,
                caseid: '141516',
                starttime: '11:40:30',
                endtime: '11:41:45',
                interviewlength: '00:00:00',
                totalsystemtime: '00:01:15',
                accessmethod: accessMethods.A,
                attemptedvia: attemptedVias.PHONE,
            },
            {
                id: '9',
                attempt: false,
                starttime: '11:41:45',
                endtime: '11:43:45',
                duration: '00:02:00',
            },
            {
                id: '10',
                attempt: true,
                outcomecategory: outcomeCategories.RESPONSES,
                outcome: '400 - Complete',
                survey: 'Rabbit Care',
                cycle: '05-17',
                operation: operationTypes.IE,
                caseid: '141516',
                starttime: '11:43:45',
                endtime: '11:53:00',
                interviewlength: '00:09:00',
                totalsystemtime: '00:09:15',
                accessmethod: accessMethods.A,
                attemptedvia: attemptedVias.PHONE,
            },
            {
                id: '11',
                attempt: false,
                starttime: '11:53:00',
                endtime: '11:53:30',
                duration: '00:00:30',
            },
            {
                id: '12',
                attempt: true,
                outcomecategory: outcomeCategories.RESPONSES,
                outcome: '400 - Complete',
                survey: 'Rabbit Care',
                cycle: '05-17',
                operation: operationTypes.IE,
                caseid: '141516',
                starttime: '11:53:30',
                endtime: '12:02:30',
                interviewlength: '00:08:30',
                totalsystemtime: '00:09:00',
                accessmethod: accessMethods.A,
                attemptedvia: attemptedVias.PHONE,
            },
        ];

        return (
            <details id="day1_int1_11am">
                <summary>11:00</summary>
                <div className="row">
                    <div className="col-sm-3 col-md-3">
                        <h5 className="mrgn-lft-md">
                            <i className="fa fa-calendar" /> Sun. January 14, 2018
                        </h5>
                    </div>
                    <div className="col-sm-3 col-md-3">
                        <h5>
                            <i className="fa fa-clock-o" /> 11:30 - 11:59{' '}
                        </h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2 col-md-2 text-right">
                        <p>Calls: 6</p>
                        <p>Cases touched: 6</p>
                        <p>Total off system time: 00:04:15</p>
                    </div>
                </div>
                <HourlyCaseWorkDetails calls={calls} />
            </details>
        );
    }
}

class HourlyCaseWorkDetails extends React.Component {
    render() {
        const rows = [];
        this.props.calls.forEach(element => {
            if (element.attempt) {
                rows.push(<AttemptRow key={element.id} attempt={element} />);
            } else {
                rows.push(<WhiteSpotRow key={element.id} whitespot={element} />);
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
                                <th className="text-right">
                                    Access<br />method
                                </th>
                                <th className="text-right display-none">
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
                <td className="text-right" />
                <td className="text-center display-none" />
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
            className += 'fa-user';
        } else if (this.props.attempt.attemptedvia === attemptedVias.PHONE) {
            className += 'phone';
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
                <td className="text-right">
                    <abbr title={this.props.attempt.accessmethod.text}>
                        {this.props.attempt.accessmethod.value}
                    </abbr>
                </td>
                <td className="text-center display-none">
                    <i className={this.getIconClassName()} />
                </td>
            </tr>
        );
    }
}

export default HourlyTab;
