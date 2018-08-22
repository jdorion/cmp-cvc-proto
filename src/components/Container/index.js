import React from 'react';

class Container extends React.Component {
    render() {
        if (this.props.isPrintView) {
            return <PrintViewPanel title={this.props.title}>{this.props.children}</PrintViewPanel>;
        } else {
            return (
                <Accordion
                    title={this.props.title}
                    includeH3={this.props.includeH3}
                    isOpen={this.props.isOpen}
                >
                    {this.props.children}
                </Accordion>
            );
        }
    }
}

class PrintViewPanel extends React.Component {
    render() {
        return (
            <div>
                <h4 className="pddng-sm">{this.props.title}</h4>
                {this.props.children}
            </div>
        );
    }
}

class Accordion extends React.Component {
    getCssClasses(includeH3) {
        var classes = 'panel-heading-collapsible'

        return classes;
    }

    getOpenStatus(isOpen) {
        return isOpen ? 'open' : '';
    }

    render() {
        // the magic line in the details element only adds the open attribute if the prop is true
        return (
            <details
                className="acc-group mrgn-bttm-md"
                {...(this.props.isOpen ? { open: 'open' } : {})}
            >
                <summary className={this.getCssClasses(this.props.includeH3)}>
                    {this.props.title}
                </summary>
                {this.props.children}
            </details>
        );
    }
}

export default Container;
