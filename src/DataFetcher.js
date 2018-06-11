import React, { Component, PropTypes } from 'react';
import identity from 'ramda/es/identity';

export default function withDataFetcher({
  reducer = identity,
  fetcher,
  event,
} = {}) {
  class DataFetcher extends Component {
    static propTypes = {
      children: PropTypes.func.isRequired,
      params: PropTypes.any,
    };

    constructor(props) {
      super(props);

      this.state = {
        data: null,
      };
      this._unsubscribe = this.registerEvent();
    }

    componentDidMount() {
      this.getData();
    }

    componentWillUnmount() {
      if (this._unsubscribe) {
        this._unsubscribe();
      }
    }

    getData(isShowLoading = '2') {
      const { params } = this.props;
      const options = { isShowLoading };
      if (params != null) {
        options.params = JSON.stringify(params);
      }
      fetcher(
        options,
        data => {
          this.setState({
            data,
          });
        },
        () => {}
      );
    }

    registerEvent() {
      return event ? event.subscribe(() => this.getData('0')) : null;
    }

    render() {
      const { data } = this.state;
      if (data == null) return null;
      const { children } = this.props;
      return children(data, reducer(data));
    }
  }

  return DataFetcher;
}
