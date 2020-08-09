import React,{useState, useEffect, Fragment} from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import columns from './TableData';
import { ngFetch } from '../../providers/NGFetch';
import TableOrCardList from '../../components/TableOrCardList';

import { selectors as layoutSelectors } from '../../layouts/TwoColumn/store';
import { connect } from 'react-redux';

function UserList({ mainPaneWidth }) {
  
  const [data, setData] =useState([]);
  useEffect( () => {
      const fetchData = async () => {
          const result = await ngFetch('https://jsonplaceholder.typicode.com/comments', { method: 'GET'})
          setData(result);
      }; fetchData()       
  }, []);

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
      />

    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  mainPaneWidth: layoutSelectors.selectMainPaneWidth(state),
});

export default connect(mapStateToProps)(UserList);