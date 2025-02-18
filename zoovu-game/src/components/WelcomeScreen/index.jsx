import React, { useState } from 'react'
import Box from '@material-ui/core/Button';
import Button from '@material-ui/core/Button';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  button: {
    borderRadius: theme.spacing(3),
    color: theme.palette.primary.main,
    borderColor: '#EDEDED',
    backgroundColor: 'white'
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

const WelcomeScreen = ({ onSubmit, userName, setUserName }) => {
  const classes = useStyles();
  const handleChange = ({ target }) => setUserName(target.value);

  return (
    <Box display='flex' flexwrap="wrap" data-testid="boxWelcome">
      <form noValidate autoComplete="off">
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Typography data-testid="welcomeUser">Hello friend, tell me your name...</Typography>
          <TextField
            id="standard-name"
            label="Your name here"
            className={classes.textField}
            value={userName}
            onChange={handleChange}
            margin="normal"
          />
            <Button variant="outlined" className={classes.button} onClick={onSubmit}>
              <Typography>Let's go</Typography>
              <ArrowRightAltIcon />
            </Button>
        </Grid>
      </form>
    </Box>
  )
}

export default WelcomeScreen;