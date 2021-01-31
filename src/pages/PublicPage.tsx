import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ChipData, ChipList, GridListComp } from '../components';
import { GridHelper, GridResponse } from '../helper';

const useStyles = makeStyles((theme) => ({
  content: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  actionButtons: {
    marginTop: theme.spacing(4),
  },
}));
const gridHelper = new GridHelper();
export const PublicPage = (): JSX.Element => {
  const classes = useStyles();
  const [grids, setGrids] = useState<GridResponse[]>([]);
  const [chips, setChips] = useState<ChipData[]>([]);

  useEffect(() => {
    setGrids(gridHelper.gridMaker())
    setChips(gridHelper.createCrosswordResultSet());
  }, [])

  const onValidate = () => {
    gridHelper.Validate();
    setChips(gridHelper.gridData);
  }

  const showCorrectAnswer = () => {
    const newData = [...grids.map((data) => {
      return { ...data, userValue: data.gridValue };
    })];
    gridHelper.GridResponse = [ ...newData ];
    setGrids([...newData]);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative" color="inherit">
        <Toolbar>
          <a href="https://learnosity.com">
            <img style={{height: 40}} src="https://learnosity.com/wp-content/uploads/2019/09/Logo.png" alt="Learnosity" />
          </a>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.content}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
              Crossword Puzzle
            </Typography>
            <ChipList chips={chips}/>
            <div className={classes.actionButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" onClick={() =>
                    onValidate()
                  }>
                    Validate
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="secondary" onClick={() =>
                    showCorrectAnswer()
                  }>
                    Show correct answer
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container maxWidth="md">
          <GridListComp grids={grids} gridHelper={gridHelper} />
        </Container>
      </main>
    </React.Fragment>
  );
}