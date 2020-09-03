import React, { useEffect } from "react"
import { withStyles } from "@material-ui/core"
import { compose } from "redux"
import { fromPairs, map, pullAllBy } from "lodash"
import withUserContext from "../../../../providers/UserAuth/withUserContext"
import { ngFetch } from "../../../../providers/NGFetch"
import ChipList from "./ChipList"

const PathwayChips = ({
  userId,
  pathwaysList,
  edit = false,
  setUserPathwaysList,
}) => {
  const [allPathways, setAllPathways] = React.useState(null)
  useEffect(() => {
    const fetchData = async () => {
      const response = await ngFetch(`/pathways`, {
        method: "GET",
      })
      setAllPathways(response.pathways)
    }
    fetchData()
  }, [pathwaysList])
  const optionsList = React.useMemo(
    () =>
      fromPairs(
        pathwaysList && pathwaysList.map(pathway => [pathway.id, pathway.name])
      ),
    [pathwaysList]
  )

  const handleDelete = async id => {
    await ngFetch(`/users/${userId}/pathways`, {
      method: "DELETE",
      body: { pathwayIds: [id] },
    })
    setUserPathwaysList({
      pathways: pathwaysList.filter(pathway => pathway.id !== parseInt(id, 10)),
      userId,
    })
  }

  const handleAddNewPathways = async (newChips,setAddDialog,setNewChips) => {
    const response = await ngFetch(`/users/${userId}/pathways`, {
      method: "POST",
      body: { pathwayIds: newChips },
    })

    setUserPathwaysList({ pathways: response.user.pathways, userId })
    setAddDialog(false)
    setNewChips([])
  }

  const getAddSelectOptions = React.useMemo(
    () =>
      fromPairs(
        map(pullAllBy(allPathways, pathwaysList, "id"), pathway => [
          pathway.id,
          pathway.name,
        ])
      ),
    [allPathways, pathwaysList]
  )

  return (
    <React.Fragment>
      <ChipList
        optionsList={optionsList}
        edit={edit}
        onRemove={handleDelete}
        onAdd={handleAddNewPathways}
        title="pathways"
        getAddSelectOptions={getAddSelectOptions}
      />
    </React.Fragment>
  )
}

export default compose(
  withUserContext,
  withStyles({ withTheme: true })
)(PathwayChips)
