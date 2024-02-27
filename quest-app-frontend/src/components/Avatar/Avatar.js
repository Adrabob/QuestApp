import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, List, ListItem, ListItemSecondaryAction, Modal, Radio } from '@mui/material';
import { Padding } from '@mui/icons-material';

function Avatar() {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(1);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    }

  return (
    <div>
    <Grid container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={{ minHeight: '50vh' }}>
    <Card>
      <CardMedia
        height={"300px"}
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
        <Button size="small" onClick={handleOpen} sx={{ml: 10.5}} >Change Avatar</Button>
      </CardActions>
    </Card>
    </Grid>
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
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