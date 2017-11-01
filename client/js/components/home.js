import * as React from 'react';

export class Home extends React.Component {

  gotoWidgetsHome = () => {
    this.props.router.push('/widgets');
  };

  gotoCarsHome = () => {
    this.props.router.push('/cars');
  };
    

  render() {

    return <section>

      <h2>Home</h2>
      
      <p>Please click a link above or a button below to select one of the demonstration applications.</p>

      <button type="button" onClick={this.gotoWidgetsHome}>Widgets</button>
      <button type="button" onClick={this.gotoCarsHome}>Cars</button>
      
    </section>;

  }

}