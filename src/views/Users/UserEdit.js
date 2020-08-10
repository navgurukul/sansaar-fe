import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import FormBuilder from "../../components/FormBuilder/FormBuilder"
import FromData from "./FormData";

function UserEdit() {
  return (
    <Fragment>
      <Link to="/users">Close</Link>
      <FormBuilder list={FromData} />
    </Fragment>
  )
}

export default UserEdit
