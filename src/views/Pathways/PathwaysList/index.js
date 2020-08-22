import React, { useEffect } from "react"
import {  withTheme } from "@material-ui/core"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { compose } from "recompose"
import { withRouter } from 'react-router';
import TableOrCardList from "../../../components/TableOrCardList"
import { ngFetch } from "../../../providers/NGFetch"
import tableColumns from "./table"
import history from "../../../providers/routing/app-history"
import {
  selectors as layoutSelectors,
  setMainPaneScrollToTopPending,
} from "../../../layouts/TwoColumn/store"
import { setAllPathways, selectors as userSelectors } from "../store"
import MainPaneWithTitle from '../../../components/MainPaneWithTitle';
import RenderCards from "../../../components/TableOrCardList/RenderCards";


function PathwaysList({ mainPaneWidth, actions, allPathways }) {
  useEffect(() => {
    const fetchData = async () => {
      const response = await ngFetch("/pathways", { method: "GET" })
      actions.setAllPathways(response.pathways)
    }
    fetchData()
  }, [actions])

  const pathwayCard = (row, key) => {
    return(
      <RenderCards row={row} key={key} titleKey={row.id} tableColumns={tableColumns} />
    )
  }
  
  


  const pathways = React.useMemo(() => Object.values(allPathways), [
    allPathways,
  ])

  const handleRowClick = pathwayId => {
    history.push(`/pathways/${pathwayId}`)
  }

  return (
    <MainPaneWithTitle addBtnLink='/pathways/add' title='Pathways'>
      <TableOrCardList
        tableColumns={tableColumns}
        data={pathways}
        containerWidth={mainPaneWidth}
        renderCard={pathwayCard}
        onRowClick={handleRowClick}
        scrollContainerToTop={() => actions.setMainPaneScrollToTopPending(true)}
      />
    </MainPaneWithTitle>
  )
}

const mapStateToProps = state => ({
  mainPaneWidth: layoutSelectors.selectMainPaneWidth(state),
  allPathways: userSelectors.selectAllPathways(state),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { setAllPathways, setMainPaneScrollToTopPending },
    dispatch
  ),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTheme,
  withRouter,
)(PathwaysList)
