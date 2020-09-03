import React, {useEffect} from "react"
import { ngFetch } from "../../../providers/NGFetch"

const TrackingwayForm = ({ pathway }) => {
  const [trackingFormWayData, setTrackingFormWayData] = React.useState(null)
  useEffect(() => {
    const fetchAllMilestones = async () => {
      const response = await ngFetch(`/pathways/${pathway.id}/trackingForm`)
      setTrackingFormWayData(response.form)
    }
    fetchAllMilestones()
  }, [pathway])

  console.log(trackingFormWayData,'trackingFormWayData')
  return (
    <div>
      <h1>TrackingformWay</h1>
    </div>
  )
}

export default TrackingwayForm
