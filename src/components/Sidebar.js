import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <Drawer variant="permanent">
      <List>
        <ListItem  component={Link} href="/drivers">
          <ListItemText primary="Drivers" />
        </ListItem>
        <ListItem  component={Link} href="/vehicles">
          <ListItemText primary="Vehicles" />
        </ListItem>
        <ListItem  component={Link} href="/transfers">
          <ListItemText primary="Transfers" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
