import React from 'react';

import styles from './Example.css';

class ExampleWithError extends React.PureComponent {
  render() {
    const { example } = this.props;
    const result = example && example.result ? example.result : null;

    if (result && result.size && result.size > 0) {
      return (
        <div className={styles.exampleOutput}>
          <h1>This should catch by ErrorBoundary</h1>
          {result.something_not_existed.get('something_not_existed')}
        </div>
      );
    }
    return <div />;
  }
}

export default ExampleWithError;
