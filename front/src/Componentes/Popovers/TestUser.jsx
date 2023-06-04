import React from 'react'
import { Popover, IconButton, Typography, List, ListItem, ListItemText,Button } from '@mui/material';
export const TestUser = () => {
  return (
    <Popover
    id={id}
    open={open}
    anchorEl={anchorEl}
    onClose={handleClose}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
  >
    <List>
      <ListItem Button>
        <ListItemText primary="Información de cuenta" />
      </ListItem>
      <ListItem Button>
        <ListItemText primary="Configuración" />
      </ListItem>
      {/* Agrega más opciones de menú según tus necesidades */}
    </List>
  </Popover>
  )
}
