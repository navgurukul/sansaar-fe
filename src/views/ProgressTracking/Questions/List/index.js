import React,{ useEffect} from 'react';
import {  withTheme } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import tableColumns from './table';
import TableOrCardList from '../../../../components/TableOrCardList';
import RenderCards from '../../../../components/TableOrCardList/RenderCards';
import { ngFetch } from '../../../../providers/NGFetch';
import { selectors as layoutSelectors, setMainPaneScrollToTopPending, setMainPaneLoading } from '../../../../layouts/TwoColumn/store';
import { setAllQuestions, selectors as progressSelectors } from '../../store';
import history from '../../../../providers/routing/app-history';
import MainPaneWithTitle from '../../../../components/MainPaneWithTitle';

function UserList({ mainPaneWidth, actions, allQuestions, mainPaneLoading }) {
  
  useEffect(() => {
    const fetchData = async () => {
      actions.setMainPaneLoading(true);
      const response = await ngFetch('/progressTracking/questions', { method: 'GET'});
      actions.setAllQuestions(response.questions);
      actions.setMainPaneLoading(false);
    };
    fetchData();
  }, [actions]);


  const questionsCard = (row, key) => (
    <RenderCards row={row} tableColumns={tableColumns} key={key} />
  )

  const questions = React.useMemo(() => Object.values(allQuestions), [allQuestions]);

  const handleRowClick = questionId => {
    history.push(`/progressTracking/questions/${questionId}`)
  }


  return (
    <MainPaneWithTitle addBtnLink="/progressTracking/questions/add" title='Questions'>
      <TableOrCardList
        loading={mainPaneLoading}
        tableColumns={tableColumns}
        data={questions}
        containerWidth={mainPaneWidth}
        renderCard={questionsCard}
        onRowClick={handleRowClick}
        scrollContainerToTop={() => actions.setMainPaneScrollToTopPending(true)}
      />
    </MainPaneWithTitle>
  )
}

const mapStateToProps = (state) => ({
  mainPaneWidth: layoutSelectors.selectMainPaneWidth(state),
  allQuestions: progressSelectors.selectAllQuestions(state),
  mainPaneLoading: layoutSelectors.selectMainPaneLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ setAllQuestions, setMainPaneScrollToTopPending, setMainPaneLoading }, dispatch),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTheme
)(UserList);