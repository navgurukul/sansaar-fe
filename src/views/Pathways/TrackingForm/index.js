import React, {useEffect} from "react"
import {Button} from '@material-ui/core'
import { ngFetch } from "../../../providers/NGFetch"
import TackingFormQuestions from './TrackingFormQuestions'
import TackingFormParameters from './TrackingFormParameters';

const TrackingwayForm = ({ pathway }) => {
  const [trackingFormWayData, setTrackingFormWayData] = React.useState(null)
  useEffect(() => {
    const fetchAllMilestones = async () => {
      const response = await ngFetch(`/pathways/${pathway.id}/trackingForm`)
      setTrackingFormWayData(response.form)
    }
    fetchAllMilestones()
  }, [pathway])


  return (
    <div>
      <Button variant="contained" color="primary" fullWidth>Click here to preview</Button>
      <TackingFormQuestions questions={trackingFormWayData} pathwayId={pathway.id} />
      <TackingFormParameters parameters={trackingFormWayData} pathwayId={pathway.id} />
    </div>
  )
}

export default TrackingwayForm
