import {
  makeStyles,
  createStyles,
  MenuItem,
  Chip,
  FormControl,
  Input,
  InputLabel,
  Select,
  Theme,
  useTheme,
  MenuProps as MenuPropsType,
} from '@material-ui/core'
import React, { useCallback, useMemo } from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }),
)

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
export const MenuProps: Partial<MenuPropsType> = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}
export function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
    padding: 10,
  }
}

export interface MultiSelectProps {
  label: string
  options: BaseOptions[]
  value?: string[]
  onChange?: (values: string[]) => void
}
const MultiSelect = (props: MultiSelectProps) => {
  const { label, value = [], options, onChange } = props
  const classes = useStyles()
  const theme = useTheme()

  const handleChange = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      const value = event.target.value as string[]
      onChange?.(value)
    },
    [onChange],
  )

  const optionsHash = useMemo(() => {
    const hash: any = {}
    options.forEach(({ value, label }) => {
      hash[value] = label
      hash[label] = value
    })
    return hash
  }, [options])

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-mutiple-chip-label">{label}</InputLabel>
      <Select
        labelId="demo-mutiple-chip-label"
        id="demo-mutiple-chip"
        multiple
        value={value}
        onChange={handleChange}
        input={<Input id="select-multiple-chip" />}
        renderValue={selected => (
          <div className={classes.chips}>
            {(selected as string[]).map(value => (
              <Chip
                key={value}
                label={optionsHash[value]}
                className={classes.chip}
              />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {options.map(({ label, value: v }) => (
          <MenuItem key={v} value={v} style={getStyles(label, value, theme)}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default MultiSelect
