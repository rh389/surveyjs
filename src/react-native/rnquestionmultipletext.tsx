﻿import * as React from 'react';
import {ReactSurveyElement, SurveyQuestionElementBase} from "./rnquestionelement";
import {QuestionMultipleTextModel} from "../question_multipletext";
import {MultipleTextItemModel} from "../question_multipletext";
import {ReactQuestionFactory} from "./rnquestionfactory";

export class SurveyQuestionMultipleText extends SurveyQuestionElementBase {
    constructor(props: any) {
        super(props);
        this.state = {colCountChanged: 0};
        var self = this;
        this.question.colCountChangedCallback = function () {
            self.state.colCountChanged = self.state.colCountChanged + 1;
            self.setState(self.state);
        }
    }
    protected get question(): QuestionMultipleTextModel { return this.questionBase as QuestionMultipleTextModel; }
    render(): JSX.Element {
        if (!this.question) return null;
        var cssClasses = this.question.cssClasses;
        var tableRows = this.question.getRows();
        var rows = [];
        for (var i = 0; i < tableRows.length; i++) {
            rows.push(this.renderRow("item" + i, tableRows[i], cssClasses));
        }
        return (
            <table className={cssClasses.root}>
                <tbody>
                {rows}
                </tbody>
            </table>
        );
    }
    protected renderRow(key: string, items: Array<MultipleTextItemModel>, cssClasses: any) {
        var tds = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var itemTitle = this.renderLocString(item.locTitle);
            tds.push(<td key={"label" + i}><span className={cssClasses.itemTitle}>{itemTitle}</span></td>);
            tds.push(<td key={"value" + i}>{this.renderItem(item, i == 0, cssClasses)}</td>);
        }
        return <tr key={key} className={cssClasses.row}>{tds}</tr>;
    }
    protected renderItem(item: MultipleTextItemModel, isFirst: boolean, cssClasses: any): JSX.Element {
        var inputId = isFirst ? this.question.inputId : null;
        return <SurveyQuestionMultipleTextItem item={item}  cssClasses={cssClasses} isDisplayMode={this.isDisplayMode} inputId={inputId} />;
    }
}

export class SurveyQuestionMultipleTextItem extends ReactSurveyElement {
    private item: MultipleTextItemModel;
    private inputId: string;
    constructor(props: any) {
        super(props);
        this.item = props.item;
        this.inputId = props.inputId;
        this.state = { value: this.item.value || '' };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
    }
    handleOnChange(event) {
        this.setState({ value: event.target.value });
    }
    handleOnBlur(event) {
        this.item.value = event.target.value;
        this.setState({ value: this.item.value });
    }
    componentWillReceiveProps(nextProps: any) {
        this.item = nextProps.item;
    }
    componentDidMount() {
        if(this.item) {
            var self = this;
            this.item.onValueChangedCallback = function(newValue) {
                self.setState({ value: newValue|| '' });
            }
        }
    }
    componentWillUnmount() {
        if(this.item) {
            this.item.onValueChangedCallback = null;
        }
    }
    render(): JSX.Element {
        if (!this.item) return null;
        var style = { float: "left" };
        if (this.isDisplayMode) return (<div id={this.inputId} className={this.cssClasses.itemValue} style={style}>{this.item.value}</div>);
        return (<input id={this.inputId} className={this.cssClasses.itemValue}  type={this.item.inputType} style={style} value={this.state.value} placeholder={this.item.placeHolder} onBlur={this.handleOnBlur} onChange={this.handleOnChange} />);
    }
    protected get mainClassName(): string { return ""; }
}

ReactQuestionFactory.Instance.registerQuestion("multipletext", (props) => {
    return React.createElement(SurveyQuestionMultipleText, props);
});
