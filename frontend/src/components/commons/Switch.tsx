import React, { useCallback } from 'react'
import { Grid, Switch as SwitchMui, Typography } from '@material-ui/core'

export interface SwitchProps {
  labelActive?: string
  labelInActive?: string
  value?: boolean
  onChange?: (value: boolean) => void
}
const Switch = (props: SwitchProps) => {
  const {
    value = false,
    labelActive = 'On',
    labelInActive = 'Off',
    onChange,
  } = props
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.target.checked)
    },
    [onChange],
  )

  return (
    <Typography component="div" style={{ paddingTop: 6, paddingBottom: 6 }}>
      <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item>{labelInActive}</Grid>
        <Grid item>
          <SwitchMui
            checked={value}
            onChange={handleChange}
            name="checkedA"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </Grid>
        <Grid item>{labelActive}</Grid>
      </Grid>
    </Typography>
  )
}

export default Switch
