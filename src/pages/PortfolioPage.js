import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
  Modal,
  ModalHeader,
  ModalBody } from 'reactstrap';

import PortfolioForm from '../components/forms/PortfolioForm';
import PortfolioList from '../components/portfolio/PortfolioList';

import { startAddPortfolio, startSetPortfolios } from '../actions/portfolio';

class PortfolioPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false
    };
  }

  componentDidMount() {
    this.props.fetchPortfolio();
  }

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }

  render() {
    return (
      <div className="container content">
        
        <nav className="navbar">
          <h1>Portfolio</h1>
          <button
            className="btn btn-primary"
            type="button"
            onClick={this.toggleModal}>
            Add portfolio
          </button>
        </nav>

        <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Add portfolio</ModalHeader>
          <ModalBody>
            <PortfolioForm
              onSubmit={(portfolio) => {
                this.props.createPortfolio(portfolio);
                this.toggleModal();
              }}/>
            </ModalBody>
        </Modal>

        {
          this.props.portfolio.length

          ? <PortfolioList />

          : <div className="alert alert-dark" role="alert">
              <h4 className="alert-heading">Oh noes!</h4>
              <p>You don't have any portfolio yet.</p>
              <hr />
              <p>You can add as many portfolios as you like, as soon as you have they will show here.</p>
              <button className="btn btn-secondary" onClick={this.toggleModal}>Add portfolio now</button>
            </div>
        }

        
      </div>
    )
  }
  
}

const mapStateToProps = (state) => ({
  portfolio: state.portfolio
});

const mapDispatchToProps = (dispatch) => ({
  fetchPortfolio: () => dispatch(startSetPortfolios()),
  createPortfolio: (portfolio) => dispatch(startAddPortfolio(portfolio))
});

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioPage);