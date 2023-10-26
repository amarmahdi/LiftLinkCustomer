import { requireNativeComponent } from 'react-native';
import React from 'react';

const Mapkit = requireNativeComponent('RNMapkit');

export default class MapView extends React.Component {
  static defaultProps = {};

  constructor(props: {} | Readonly<{}>) {
    super(props);
  }

  private getProps() {
    return {
      ...this.props,
    };
  }

  public render() {
    return <Mapkit {...this.getProps()} />;
  }
}
