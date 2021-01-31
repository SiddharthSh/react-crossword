import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

export interface ChipData {
  code?: string;
  label: string;
  valid?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(0.5),
      margin: 0,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  }),
);

export const ChipList = (props: {chips: ChipData[]}): React.ReactElement => {
  const classes = useStyles();
  return (
    <Paper component="ul" className={classes.root}>
      {props.chips.map((data) => {
        return (
          <li key={data.code}>
            <Chip
              label={data.label}
              className={classes.chip}
              color={data.valid ? 'primary' : 'default'}
            />
          </li>
        );
      })}
    </Paper>
  );
}
