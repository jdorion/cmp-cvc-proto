<a data-tip data-for={this.props.claims[i].id + '-tt'}>
                        test;
                    </a>
                    <ReactTooltip
                        key={this.props.claims[i].id}
                        id={this.props.claims[i].id + '-tt'}
                    >
                        <span className="cvc-tooltip">
                            <strong>Survey</strong>
                            <br />
                            {this.props.claims[i].surveyName}
                            <br />
                            <strong>PE code</strong>
                            <br />
                            {this.props.claims[i].pecode}
                            <br />
                            <strong>Activity</strong>
                            <br />
                            {this.props.claims[i].activity}
                            <br />
                            <strong>Duration</strong>
                            <br />
                            {this.props.claims[i].starttime + ' - ' + this.props.claims[i].endtime}
                        </span>
                    </ReactTooltip>