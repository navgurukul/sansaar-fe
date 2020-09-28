import React, { useState, useEffect } from "react"
import { Button, Chip, withStyles, Box} from "@material-ui/core"
import { useSnackbar } from "notistack"
import { useDrop } from "react-dnd"
import update from "immutability-helper"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { compose } from "recompose"
import { get } from "lodash"
import { ngFetch } from "../../../../providers/NGFetch"
import { ItemTypes } from "./ItemTypes"
import RenderCard from "./Card"
import Dustbin from './Dustbin'
import {
  selectors as layoutSelectors,
  setMainPaneScrollToTopPending,
  setMainPaneLoading,
} from "../../../../layouts/TwoColumn/store"
import { setAllCourses, selectors as userSelectors, addOrRearrangeCourse } from "../../store"

const styles=() =>({
  chip:{
    width:"100%",
  },
  dustbin:{ 
    overflow: 'hidden', 
    clear: 'both' 
  }
})

const Container = ({ pathwayId, actions, allCourses, classes }) => {
  const [cards, setCards] = useState(null)
  const { enqueueSnackbar } = useSnackbar()
  useEffect(() => {
    const fetchData = async () => {
      const response = await ngFetch(`/pathways/${pathwayId}/courses`, {
        method: "GET",
      })
      actions.setAllCourses(response.courses)
      setCards(response.courses)
    }
    fetchData()
  }, [actions, pathwayId])

  const courses = React.useMemo(() => setCards(Object.values(allCourses)), [
    allCourses,
  ])
  const findCard = id => {
    const card = cards.filter(c => `${c.id}` === id)[0]
    return {
      card,
      index: cards.indexOf(card),
    }
  }

  const deleteCard = async id => {
    const card = cards.filter(c => `${c.id}` !== id)
    const courseIds = card.map(course => get(course, "id", ""))
    const courseIdsToSave = {courseIds}
    const response = await ngFetch(`/pathways/${pathwayId}/courses`, {
      method: "PUT",
      body: courseIdsToSave,
    })
    actions.addOrRearrangeCourse({
      pathwaysCourses: response.courses,
    })
    enqueueSnackbar("Course deleted.", { variant: "success" })
  }

  const handleSave = async data => {
    const courseIds = data.map(card => get(card, "id", ""))
    const courseIdsToSave = {courseIds}
    const response = await ngFetch(`/pathways/${pathwayId}/courses`, {
      method: "PUT",
      body: courseIdsToSave,
    })
    actions.addOrRearrangeCourse({
      pathwaysCourses: response.courses,
    })
    enqueueSnackbar("Courses rearranged.", { variant: "success" })
  }

  const moveCard = (id, atIndex) => {
    const { card, index } = findCard(id)
    setCards(
      update(cards, {
        $splice: [
          [index, 1],
          [atIndex, 0, card],
        ],
      })
    )
  }
  const [, drop] = useDrop({ accept: ItemTypes.CARD })
  console.log(cards,'cardscards');
  const showCards = allCards => {
    return allCards.map(card => (
      <RenderCard
        key={card.id}
        id={card.id}
        text={card.name}
        logo={card.logo}
        moveCard={moveCard}
        findCard={findCard}
        deleteCard={deleteCard}
      />
    ))
  }
  return (
    <React.Fragment>
      <div ref={drop}>
        {cards!== null && cards && showCards(cards)}
        {cards && cards.length === 0 ? (
          <Chip
            className={classes.chip}
            label='No courses Created'
            disabled
          />
        ) : (
          <React.Fragment>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSave(cards)}
              fullWidth
            >
              Save after rearranging
            </Button>
            <Box className={classes.dustbin}>
              <Dustbin />
            </Box>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  mainPaneWidth: layoutSelectors.selectMainPaneWidth(state),
  allCourses: userSelectors.selectAllCourses(state),
  mainPaneLoading: layoutSelectors.selectMainPaneLoading(state),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { setAllCourses, setMainPaneScrollToTopPending, setMainPaneLoading, addOrRearrangeCourse },
    dispatch
  ),
})

export default compose(connect(mapStateToProps, mapDispatchToProps),withStyles(styles))(Container)
