import { useCallback, useContext, useMemo } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import { blue } from '@material-ui/core/colors'
import { Form } from 'react-final-form'
import Space from '../../components/commons/Space'
import { InputField, SelectField } from '../../components/fields'
import { UpdateUserCtx } from '../../constant/contexts'
import { useUpdateUser } from '../../services/user/user-query'
import { Role } from '../../services/auth/auth-types'
import { UpdateUserParams } from '../../services/user/user-types'
import SaveIcon from '@material-ui/icons/Save'
import { Paper, Theme } from '@material-ui/core'
import { capitalize } from 'lodash'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    layout: {
      padding: 20,
    },
    avatar: {
      backgroundColor: blue[100],
      color: blue[600],
    },
    button: {
      margin: theme.spacing(1),
    },
  }),
)

interface UpdateUserFormValues extends Omit<UpdateUserParams, 'userId'> {}

const UpdateUser = () => {
  const classes = useStyles()

  const { mutate: updateUser } = useUpdateUser()
  const [state, setState, { reset }] = useContext(UpdateUserCtx)
  const { visible, userId, name, password, role } = state
  const handleClose = useCallback(() => {
    reset()
  }, [reset])

  const onSubmit = useCallback(
    (values: UpdateUserFormValues) => {
      const { name, password, role } = values
      updateUser(
        {
          userId,
          name,
          password,
          role,
        },
        {
          onSuccess: () => {
            handleClose()
          },
        },
      )
    },
    [handleClose, updateUser, userId],
  )

  const roleOptions = useMemo(() => {
    const options: BaseOptions[] = [
      { value: Role.USER, label: capitalize(Role.USER) },
      { value: Role.MANAGER, label: capitalize(Role.MANAGER) },
      { value: Role.ADMIN, label: capitalize(Role.ADMIN) },
    ]
    return options
  }, [])

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={visible}
    >
      <Paper className={classes.layout}>
        <Form<UpdateUserFormValues>
          onSubmit={onSubmit}
          initialValues={{
            name,
            password,
            role,
          }}
        >
          {({ handleSubmit }) => {
            return (
              <Space direction="column">
                <InputField name="name" label="Name" />
                {/* <InputField name="password" label="Password" /> */}
                <SelectField name="role" label="Role" options={roleOptions} />
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                  onClick={handleSubmit}
                >
                  Save
                </Button>
              </Space>
            )
          }}
        </Form>
      </Paper>
    </Dialog>
  )
}
export default UpdateUser
