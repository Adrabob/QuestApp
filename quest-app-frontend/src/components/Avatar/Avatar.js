import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { List, ListItem, ListItemSecondaryAction, Modal, Radio } from '@mui/material';
import { PutWithAuth } from '../../services/HttpService';

function Avatar(props) {
    const {avatarId} = props; 
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(avatarId);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        avatarSave();
    }

    const avatarSave = () => {
      console.log(localStorage.getItem("currentUser"));

        PutWithAuth("/users/" + localStorage.getItem("currentUser"),
        {
            avatar: selectedValue
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });

    }

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    }

  return (
    <div>
    <Card sx={{ minWidth:200, m:3}}>
      <CardMedia
        height="200"
        component="img"
        image={`/avatars/avatar${selectedValue}.png`}
        title="User Avatar"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {localStorage.getItem("userName")}
        </Typography>
        <Typography variant="body2" color="text.secondary" component="p">
         UserId = {localStorage.getItem("currentUser")}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleOpen} >Change Avatar</Button>
      </CardActions>
    </Card>
    
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    style={{display:'flex', justifyContent:'center', alignItems:'center'}}
    >
    
    <List dense sx={{ width: '100%', maxWidth: 150, bgcolor: 'background.paper'}} >
      {[1, 2, 3, 4, 5, 6, 7].map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem key={value}>
            <CardMedia
            style={{width: 75, height: 75}}
            component="img"
            image={`/avatars/avatar${value}.png`}
            title="User Avatar"
            />
              <ListItemSecondaryAction>
                <Radio
                    edge="end"
                    value={value}
                    onChange={handleChange}
                    checked={""+selectedValue === ""+value}
                    inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemSecondaryAction>
            </ListItem>
            
        );
      })}
    </List>
    </Modal>
    </div>
  );
}
export default Avatar;