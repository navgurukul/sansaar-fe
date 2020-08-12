import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import FormBuilder from "../../components/FormBuilder/FormBuilder"
import FromData from "./FormData";
function UserEdit(props) {
  return (
    <Fragment>
      <FormBuilder FromData={FromData} />
      <Link to="/users">Close</Link>
      <br />
    </Fragment>
  )
}

export default UserEdit
