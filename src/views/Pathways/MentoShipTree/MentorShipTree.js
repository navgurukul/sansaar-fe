import React, {useEffect} from 'react'
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import {Box} from '@material-ui/core';
import { ngFetch } from '../../../providers/NGFetch';
import { setMainPaneLoading } from '../../../layouts/TwoColumn/store';

const MentorShipTree =({match, actions}) =>{
    const { pathwayId } = match.params;

    const [tree, setTree] = React.useState(null);
    useEffect(() => {
      const fetchData = async () => {
        actions.setMainPaneLoading(true);
        const response = await ngFetch(`/pathways/${pathwayId}/mentorship/tree`);
        setTree(response.tree);
        actions.setMainPaneLoading(false);
      }
      fetchData();
    }, [actions,pathwayId]);

    const treeView = (tree) =>{
        const name=  tree ? tree.map((each) => {
          return (
            <React.Fragment key={each.name}>
              
              <Box>
                
                <TreeItem
                  label={`${each.name} (${each.email})`}
                  nodeId={each.name}
                >
                  {each.mentees.length===0?'':treeView(each.mentees)}
                </TreeItem>
              </Box>
              
            </React.Fragment>
)}) : ''


        return(
            name
        )
    }
    return(
      <React.Fragment>
        <h1>MentorShipTree</h1>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {tree ? tree.length === 0 ? 'NO data is there' : treeView(tree)  : '' }
        </TreeView>

      </React.Fragment>
      
    )
}

  
  const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ setMainPaneLoading }, dispatch),
  });

export default compose(
    connect(null, mapDispatchToProps),
    withRouter,
  )(MentorShipTree);

