import React, { useEffect } from "react"
import {  withTheme } from "@material-ui/core"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { compose } from "recompose"
import { withRouter } from 'react-router';
import TableOrCardList from "../../../../components/TableOrCardList"
import { ngFetch } from "../../../../providers/NGFetch"
import tableColumns from "./table"
import history from "../../../../providers/routing/app-history"
import {
  selectors as layoutSelectors,
  setMainPaneScrollToTopPending,
  setMainPaneLoading,
} from "../../../../layouts/TwoColumn/store"
import { setAllPathways, selectors as userSelectors } from "../../store"
import MainPaneWithTitle from '../../../../components/MainPaneWithTitle';


function PathwaysList({ mainPaneWidth, actions, allPathways,mainPaneLoading }) {
  useEffect(() => {
    const fetchData = async () => {
      actions.setMainPaneLoading(true);
      const response = await ngFetch("/pathways", { method: "GET" })
      actions.setAllPathways(response.pathways)
      actions.setMainPaneLoading(false);
    }
    fetchData()
  }, [actions])

  
  


  const pathways = React.useMemo(() => Object.values(allPathways), [
    allPathways,
  ])

  const handleRowClick = pathwayId => {
    history.push(`/pathways/${pathwayId}`)
  }

  return (
    <MainPaneWithTitle addBtnLink='/pathways/add' title='Pathways'>
      <TableOrCardList
        loading={mainPaneLoading}
        tableColumns={tableColumns}
        data={pathways}
        containerWidth={mainPaneWidth}
        onRowClick={handleRowClick}
        scrollContainerToTop={() => actions.setMainPaneScrollToTopPending(true)}
        cardTitle='code'
      />
    </MainPaneWithTitle>
  )
}

const mapStateToProps = state => ({
  mainPaneWidth: layoutSelectors.selectMainPaneWidth(state),
  allPathways: userSelectors.selectAllPathways(state),
  mainPaneLoading: layoutSelectors.selectMainPaneLoading(state),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { setAllPathways, setMainPaneScrollToTopPending,setMainPaneLoading },
    dispatch
  ),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTheme,
  withRouter,
)(PathwaysList)
