import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { startEditPortfolio } from '../../actions/portfolio';

import { formatDate } from '../../utils/dates';

import { 
  Modal,
  ModalHeader,
  ModalBody } from 'reactstrap';

import PortfolioForm from '../forms/PortfolioForm';

class PortfolioList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      editing: null
    };
  }

  toggleModal = (portfolio) => {
    this.setState({
      modalOpen: !this.state.modalOpen,
      editing: portfolio
    });
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Edit portfolio</ModalHeader>
          <ModalBody>
            <PortfolioForm
              portfolio={this.state.editing}
              onSubmit={(portfolio) => {
                this.props.editPortfolio(this.state.editing.id, portfolio);
                this.toggleModal();
              }}/>
            </ModalBody>
        </Modal>
        <div className="row">
          {this.props.portfolio.map((portfolioItem) => {
            return (
              <div key={portfolioItem.id} className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title mb-0">{portfolioItem.name}</h4>
                    <p>
                      <span class="badge badge-info">{portfolioItem.currency}</span>
                      <span class="badge badge-info ml-1">{formatDate(portfolioItem.created)}</span>
                    </p>
                    {portfolioItem.description && <p className="card-text">{portfolioItem.description}</p>}
                    <nav className="float-right">
                    <Link to="/" className="btn btn-primary">View</Link>
                    <button
                      type="button"
                      className="btn btn-secondary ml-2"
                      onClick={() => this.toggleModal(portfolioItem)}>Edit</button>
                    </nav>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
  
}

const mapStateToProps = (state) => ({
  portfolio: state.portfolio
})

const mapDispatchToProps = (dispatch) => ({
  editPortfolio: (id, data) => dispatch(startEditPortfolio(id, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioList);