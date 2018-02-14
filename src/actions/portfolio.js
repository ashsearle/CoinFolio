import database from '../firebase/firebase';

export const addPortfolio = (portfolio) =>  ({
  type: 'ADD_PORTFOLIO',
  portfolio
});

export const startAddPortfolio = (portfolioData = {}) => {
  console.log('portfolioData', portfolioData)
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
    console.log('portfolio', portfolio)
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
      dispatch(setPortfolio(portfolio));
    });
  }
};