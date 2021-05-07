import { Button } from '@material-ui/core'
import { template } from 'lodash'
import React, { useCallback, useContext } from 'react'
import { Form } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import AddButton from '../../components/AddButton'
import BasicList from '../../components/BasicList'
import Page from '../../components/commons/Page'
import Space from '../../components/commons/Space'
import { TemplateFormCtx } from '../../constant/contexts'
import {
  useCreateTemplate,
  useGetTemplates,
  useUpdateTemplate,
} from '../../services/template/template-query'
import { TemplateEntity } from '../../services/template/template-types'
import { withCtx } from '../../utils/helper'
import TemplateForm, { TemplateFormValues } from './TemplateForm'

const Setting = () => {
  const { t } = useTranslation()
  const { data: templates } = useGetTemplates()
  const { mutate: createTemplate } = useCreateTemplate()
  const { mutate: updateTemplate } = useUpdateTemplate()
  const [, setState] = useContext(TemplateFormCtx)

  const onSubmitTemplateForm = useCallback(
    (values: TemplateFormValues) => {
      const { id, isActive, resourceIds } = values
      if (id) {
        updateTemplate({
          templateId: id,
          isActive,
          resourceIds,
        })
      } else {
        createTemplate({
          isActive,
          resourceIds,
        })
      }
      console.log({ values })
    },
    [createTemplate, updateTemplate],
  )

  const renderActions = useCallback(
    (data: TemplateEntity) => {
      const { id: templateId, isActive, ref, resources } = data
      console.log({
        ...data,
      })
      return (
        <Space spacing={10}>
          <Button
            variant="outlined"
            color={'primary'}
            style={{ fontWeight: 'bold' }}
            size="small"
            onClick={() => {
              setState({
                visible: true,
                id: templateId,
                isActive,
                ref,
                resourceIds: resources ? resources.map(d => d.id) : [],
              })
            }}
          >
            Edit
          </Button>
        </Space>
      )
    },
    [setState],
  )

  const onButtonAddTemplateClick = useCallback(() => {
    setState({
      visible: true,
    })
  }, [setState])

  return (
    <Page title={t('Setting')}>
      <Button
        variant="outlined"
        color="primary"
        onClick={onButtonAddTemplateClick}
      >
        Add Template
      </Button>
      <BasicList
        data={templates}
        columns={['ref', 'isActive']}
        renderActions={renderActions}
      />
      <TemplateForm onSubmit={onSubmitTemplateForm} />
    </Page>
  )
}

export default withCtx(TemplateFormCtx)(Setting)
