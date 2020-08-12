import React,{useState, useEffect, Fragment} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import columns from './TableData';
import TableOrCardList from '../../components/TableOrCardList';
import { selectors as layoutSelectors } from '../../layouts/TwoColumn/store';
import history from '../../providers/routing/app-history';
function UserList({ mainPaneWidth, data }) {


  const handleEditData = ({row, pageIndex, pageSize}) =>{
    history.push('/users/edit/userid', row.original);
  }

  // state for seach box
  const [search, setSearch] = useState('')

  // onChange Handler for searchBox
  const  handleFilterChange = e => {
    const value = e.target.value || undefined;
    setSearch(value);
  };

  return(
    <Fragment>
      <Link to="/users/add">Add a user</Link>
      <br/>
      
      <TextField
        defaultValue={search}
        onChange={handleFilterChange}
        placeholder="Search"
        style={{marginTop:20}}
       />

      <TableOrCardList
        columns={columns}
        searchQuery={search}
        data={data}
        containerWidth={mainPaneWidth}
        onClick={handleEditData} 
      />

    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  mainPaneWidth: layoutSelectors.selectMainPaneWidth(state),
});

export default connect(mapStateToProps)(UserList);