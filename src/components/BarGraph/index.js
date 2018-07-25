import React from 'react';

class BarGraph extends React.Component {
    render() {
        return (
            <div className="col-sm-12 col-md-12 cvc-barGraph mrgn-bttm-md">
                <br />
                <BarGraphLine1 shiftStart={this.props.shiftStart} shiftEnd={this.props.shiftEnd} />
                <BarGraphLine2 />
                <BarGraphLine3 />
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

class BarGraphLine2 extends React.Component {
    render() {
        return (
            <table className="mrgn-lft-md width100">
                <tbody>
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
                </tbody>
            </table>
        );
    }
}

class BarGraphLine3 extends React.Component {
    render() {
        return (
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
