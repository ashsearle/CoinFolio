import database from '../firebase/firebase';

export const addPortfolio = (portfolio) =>  ({
  type: 'ADD_PORTFOLIO',
  portfolio
});

export const startAddPortfolio = (portfolioData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      name = '',
      description = '',
      currency = '',
      created = (new Date()).toISOString(),
      isPublic = false
    } = portfolioData;
    const portfolio = {name, description, currency, created, isPublic};
    database.ref(`users/${uid}/portfolios`).push(portfolio).then((ref) => {
      dispatch(addPortfolio({
        id: ref.key,
        ...portfolio
      }))
    }).catch((e) => {
      console.log('error', e)
    });
  }
}

export const editPortfolio = (id, updates) =>  ({
  type: 'EDIT_PORTFOLIO',
  id,
  updates
});

export const startEditPortfolio = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    database.ref(`users/${uid}/portfolios/${id}`).update(updates).then(() => {
      dispatch(editPortfolio(id, updates));
    });
  }
};

export const removePortfolio = ({ id } = {}) =>  ({
  type: 'REMOVE_PORTFOLIO',
  id
});

export const startRemovePortfolio = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    database.ref(`users/${uid}/portfolios/${id}`).remove().then(() => {
      dispatch(removePortfolio({ id }));
    });
  }
};

export const setPortfolio = (portfolio) => ({
  type: 'SET_PORTFOLIO',
  portfolio
});

export const startSetPortfolios = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const portfolio = getState().portfolio;
    if (portfolio.length) return dispatch(setPortfolio(portfolio));
    database.ref(`users/${uid}/portfolios`).once('value', (snapshot) => {
      const portfolio = [];
      snapshot.forEach((child) => {
        portfolio.push({
          id: child.key,
          ...child.val()
        });
      });
      portfolio.map((portfolioItem) => {
        if (portfolioItem.transactions) {
          const formattedTransactions = [];
          Object.keys(portfolioItem.transactions).forEach((key) => {
            formattedTransactions.push({
              id: key,
              ...portfolioItem.transactions[key]
            });
          });
          portfolioItem.transactions = formattedTransactions;
        }
        return portfolioItem;
      })
      dispatch(setPortfolio(portfolio));
    });
  }
};

export const addTransaction = (portfolioId, transaction) =>  ({
  type: 'ADD_TRANSACTION',
  portfolioId,
  transaction
});

export const startAddTransaction = (portfolioId, transactionData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      type = '',
      coin = '',
      amount = '',
      price = '',
      currency = '',
      date = '',
      description = ''
    } = transactionData;
    const transaction = {type, coin, amount, price, currency, date, description};
    database.ref(`users/${uid}/portfolios/${portfolioId}/transactions`).push(transaction).then((ref) => {
      dispatch(addTransaction(
        portfolioId,
      {
        id: ref.key,
        ...transaction
      }))
    }).catch((e) => {
      console.log('error', e)
    });
    
  }
}

export const editTransaction = (portfolioId, transactionId, transaction) =>  ({
  type: 'EDIT_TRANSACTION',
  portfolioId,
  transactionId,
  transaction
});

export const startEditTransaction = (portfolioId, transactionId, transaction) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    database.ref(`users/${uid}/portfolios/${portfolioId}/transactions/${transactionId}`).update(transaction).then(() => {
      dispatch(editTransaction(portfolioId, transactionId, transaction));
    });
  }
};


export const removeTransaction = (portfolioId, transactionId) =>  ({
  type: 'REMOVE_TRANSACTION',
  portfolioId,
  transactionId
});

export const startRemoveTransaction = (portfolioId, transactionId) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    database.ref(`users/${uid}/portfolios/${portfolioId}/transactions/${transactionId}`).remove().then(() => {
      dispatch(removeTransaction(portfolioId, transactionId));
    });
  }
};