import {
  FormControl,
  InputLabel,
  Theme,
  Select as SelectMui,
} from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core'
import React, { useCallback } from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      // marginTop: 20,
      // marginBottom: 20,
      minWidth: 120,
    },
    select: {
      // width: '100%',
      marginTop: theme.spacing(2),
    },
  }),
)

export interface SelectProps {
  label: string
  value?: any
  options: BaseOptions[]
  onChange?: (value: string) => void
  disabled?: boolean
}
const Select = (props: SelectProps) => {
  const { label, value, options, disabled, onChange } = props
  const classes = useStyles()

  const handleChange = useCallback(
    (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
      const value = event.target.value as string
      onChange?.(value)
    },
    [onChange],
  )

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel
        htmlFor="outlined-age-native-simple"
        style={{ backgroundColor: 'white', paddingRight: 6, paddingLeft: 6 }}
      >
        {label}
      </InputLabel>
      <SelectMui
        native
        className={classes.select}
        // defaultValue={value}
        value={value}
        onChange={handleChange}
        // label={label}
        inputProps={{
          name: 'label',
          id: 'outlined-age-native-simple',
        }}
        disabled={disabled || !options.length}
      >
        {/* <option aria-label="None" value="" /> */}
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </SelectMui>
    </FormControl>
  )
}

export default Select
