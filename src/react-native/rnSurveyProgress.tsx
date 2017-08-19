﻿import * as React from 'react';
import {SurveyModel} from "../survey";
import {SurveyNavigationBase} from "./rnSurveyNavigationBase";

export class SurveyProgress extends SurveyNavigationBase {
    protected isTop: boolean;
    constructor(props: any) {
        super(props);
        this.isTop = props.isTop;
    }
    componentWillReceiveProps(nextProps: any) {
        super.componentWillReceiveProps(nextProps);
        this.isTop = nextProps.isTop;
    }
    protected get progress(): number { return this.survey.getProgress(); }
    protected get progressText(): string { return this.survey.progressText; }
    render(): JSX.Element {
        var style = this.isTop ? { width: "60%" } : { width: "60%", marginTop: "10px" };
        var progressStyle = { width: "auto", minWidth: this.progress + "%", paddingLeft: "2px", paddingRight: "2px" };
        return (<div className={this.css.progress} style={style}>
            <div style={progressStyle} className={this.css.progressBar} role="progressbar" aria-valuemin="0" aria-valuemax="100">
                <span>{this.progressText}</span>
                </div>
            </div>);
    }
}
