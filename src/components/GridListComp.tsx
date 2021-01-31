import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import React, { useEffect, useState } from 'react';
import { GridHelper, GridResponse } from '../helper';
import { GridListTextComp } from './GridListTextComp';

export interface GridListCompProps {
  gridHelper: GridHelper;
  grids: GridResponse[];
}

export const GridListComp = (props: GridListCompProps): React.ReactElement => {
  const [, setGrids] = useState<GridResponse[]>([]);

  useEffect(() => {
    setGrids(props.grids);
  }, [props.grids])

  const onHandleChangeEvent = (
    userValue: string,
    index: number
  ) => {
    props.gridHelper.GridResponse[index] = { ...props.gridHelper.GridResponse[index], userValue};
    // setGrids(grids);
    // props.gridHelper.GridResponse = [...grids];
  };

  return (
    <GridList cellHeight={'auto'} cols={15} spacing={0}>
      {props.gridHelper.GridResponse.map((gridTile, index) => {
        return (
          <GridListTile key={index} style={{ background: gridTile.disabled ? '#757070' : 'white' }}>
            {gridTile.userValue && (
              <GridListTextComp key={index} index={index} value={gridTile.userValue} disabled={gridTile.disabled} onEventChange={onHandleChangeEvent} />
            )}
            {!gridTile.userValue && (
              <GridListTextComp key={index} index={index} disabled={gridTile.disabled} onEventChange={onHandleChangeEvent} />
            )}
          </GridListTile>
        )
      })}
    </GridList>
  )
}
