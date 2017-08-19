﻿import * as React from 'react';
import {SurveyQuestionElementBase} from "./rnquestionelement";
import {QuestionTextModel} from "../question_text";
import {ReactQuestionFactory} from "./rnquestionfactory";


export class SurveyQuestionText extends SurveyQuestionElementBase {
    constructor(props: any) {
        super(props);
        this.state = { value: this.question.value || '' };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
    }
    protected get question(): QuestionTextModel { return this.questionBase as QuestionTextModel; }
    componentWillReceiveProps(nextProps: any) {
        super.componentWillReceiveProps(nextProps);
        this.state = { value: this.question.value || '' };
    }
    handleOnChange(event) {
        this.setState({ value: event.target.value });
    }
    handleOnBlur(event) {
        this.question.value = event.target.value;
        this.setState({ value: this.question.value || '' });
    }
    render(): JSX.Element {
        if (!this.question) return null;
        var cssClasses = this.question.cssClasses;
        if (this.isDisplayMode)
            return (<div id={this.question.inputId} className={cssClasses.root}>{this.question.value}</div>)
        return (
            <input id={this.question.inputId} className={cssClasses.root} type={this.question.inputType} value={this.state.value} size={this.question.size} placeholder={this.question.placeHolder} onBlur={this.handleOnBlur} onChange={this.handleOnChange} />
        );
    }
}

ReactQuestionFactory.Instance.registerQuestion("text", (props) => {
    return React.createElement(SurveyQuestionText, props);
});
