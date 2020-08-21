import React,{ useEffect} from 'react';
import {  withTheme } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import tableColumns from './table';
import ProgressCard from '../../components/ProgressCard';
import TableOrCardList from '../../../../components/TableOrCardList';
import { ngFetch } from '../../../../providers/NGFetch';
import { selectors as layoutSelectors, setMainPaneScrollToTopPending, setMainPaneLoading } from '../../../../layouts/TwoColumn/store';
import { setAllParameters, selectors as progressSelectors } from '../../store';
import history from '../../../../providers/routing/app-history';
import MainPaneWithTitle from '../../../../components/MainPaneWithTitle';

function UserList({ mainPaneWidth, actions, allParameters, mainPaneLoading }) {
  
  useEffect(() => {
    const fetchData = async () => {
      actions.setMainPaneLoading(true);
      const response = await ngFetch('/progressTracking/parameters', { method: 'GET'});
      actions.setAllParameters(response.parameters);
      actions.setMainPaneLoading(false);
    };
    fetchData();
  }, [actions]);


  const progressCard = (parameter, key) => (
    <ProgressCard
      key={key}
      id={parameter.id}
      name={parameter.name}
      description={parameter.description}
      type={parameter.type}
      joinedAt={parameter.createdAt}
      minimumValue={parameter.min_value}
      maximumValue={parameter.max_value}
    />
  )

  const parameters = React.useMemo(() => Object.values(allParameters), [allParameters]);

  const handleRowClick = (parameterId) => {
    history.push(`/progressTracking/parameters/${parameterId}`)
  }


  return (

    <MainPaneWithTitle addBtnLink="/progressTracking/parameters/add" title='Parameters'>
      <TableOrCardList
        loading={mainPaneLoading}
        tableColumns={tableColumns}
        data={parameters}
        containerWidth={mainPaneWidth}
        renderCard={progressCard}
        onRowClick={handleRowClick}
        scrollContainerToTop={() => actions.setMainPaneScrollToTopPending(true)}
      />
    </MainPaneWithTitle>
  )
}

const mapStateToProps = (state) => ({
  mainPaneWidth: layoutSelectors.selectMainPaneWidth(state),
  allParameters: progressSelectors.selectAllParameters(state),
  mainPaneLoading: layoutSelectors.selectMainPaneLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ setAllParameters, setMainPaneScrollToTopPending, setMainPaneLoading }, dispatch),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTheme
)(UserList);