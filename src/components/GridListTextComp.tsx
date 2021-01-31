import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from 'react';

export interface GridListTextCompProps {
  index: number;
  value?: string;
  disabled: boolean;
  onEventChange: (value: string, index: number) => void;
}

export const GridListTextComp = (props: React.PropsWithChildren<GridListTextCompProps>): React.ReactElement => {
  const [value, setValue] = useState<string>(props.value ?  props.value : '');

  useEffect(() => {
    setValue(props.value ?  props.value : '');
  }, [props.value])

  return (
    <TextField
      disabled={props.disabled}
      variant="outlined"
      value={value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^[A-Za-z]+$/;
        if (regex.test(event.target.value)) {
          setValue(event.target.value);
          return props.onEventChange(event.target.value.toUpperCase(), props.index);
        } else {
          setValue('');
        }
      }}
      inputProps={{
        maxLength: 1,
        style: { textAlign: 'center', textTransform: 'uppercase' }
      }}
    />
  )
}
