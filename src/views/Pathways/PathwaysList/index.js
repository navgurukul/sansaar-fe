import React, { useEffect, Fragment } from "react"
import { Typography, withTheme } from "@material-ui/core"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { compose } from "recompose"
import { withRouter } from 'react-router';
import Button from "@material-ui/core/Button"
import TableOrCardList from "../../../components/TableOrCardList"
import { ngFetch } from "../../../providers/NGFetch"
import tableColumns from "./table"
import PathwayCard from "../components/PathwayCard"
import history from "../../../providers/routing/app-history"
import Spacer from "../../../components/Spacer"
import {
  selectors as layoutSelectors,
  setMainPaneScrollToTopPending,
} from "../../../layouts/TwoColumn/store"
import { setAllPathways, selectors as userSelectors } from "../store"


function PathwaysList({ mainPaneWidth, actions, allPathways, theme }) {
  useEffect(() => {
    const fetchData = async () => {
      const response = await ngFetch("/pathways", { method: "GET" })
      actions.setAllPathways(response.pathways)
    }
    fetchData()
  }, [actions])

  const pathwayCard = (pathway, key) => (
    <PathwayCard
      key={key}
      id={pathway.id}
      code={pathway.code}
      name={pathway.name}
      startedAt={pathway.createdAt}
      description={pathway.description}
    />
  )

  const pathways = React.useMemo(() => Object.values(allPathways), [
    allPathways,
  ])

  const handleRowClick = pathwayId => {
    history.push(`/pathways/${pathwayId}`)
  }

  const handleAddPathWay = () => {
    history.push('/pathways/add')
  }

  return (
    <Fragment>
      <Typography variant="h3">Pathways</Typography>
      <Spacer height={theme.spacing(2)} />
      <Button variant="contained" color="primary" onClick={handleAddPathWay}>
        Add Pathway
      </Button>
      <Spacer height={theme.spacing(2)} />
      <TableOrCardList
        tableColumns={tableColumns}
        data={pathways}
        containerWidth={mainPaneWidth}
        renderCard={pathwayCard}
        onRowClick={handleRowClick}
        scrollContainerToTop={() => actions.setMainPaneScrollToTopPending(true)}
      />
    </Fragment>
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
