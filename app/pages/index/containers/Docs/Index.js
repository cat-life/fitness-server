import React, { Component } from 'react';
import request from 'app/vendor/request';

export default class Docs extends Component {
  state = {
    markdown: ''
  }

  fetchFile(fileName) {
    request.get(`/end/markdown/${fileName}`)
      .promiseify()
      .then((res) => {
        this.setState({
          markdown: JSON.parse(res.text).data
        });
      }, (err) => {
        console.log(err);
      });
  }

  componentWillMount() {
    this.fetchFile(this.props.params.file);
  }

  render() {
    return (
      <div className="container page-markdown">
        <div dangerouslySetInnerHTML={{__html: this.state.markdown}} className="markdown-marked"/>
      </div>
    );
  }
}
