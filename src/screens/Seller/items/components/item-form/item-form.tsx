import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Icon, Accordion, Header, Grid, Button, Form } from 'semantic-ui-react'
import { z } from 'zod'
import type { SubmitHandler } from 'react-hook-form'
import type { AccordionTitleProps } from 'semantic-ui-react'

const validationSchema = z.object({
  title: z.string().trim().min(1),
  price: z.coerce.number().positive(),
  redirectTo: z.string().trim().default(''),
})

type ValidationSchema = z.infer<typeof validationSchema>

type Props = {
  onFormSubmitted: (_: ValidationSchema) => void
  serviceFee: number
}

const Component = ({ onFormSubmitted, serviceFee }: Props) => {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ValidationSchema>({
    mode: 'onChange',
    resolver: zodResolver(validationSchema),
    defaultValues: {
      title: '',
      price: 0,
      redirectTo: '',
    },
  })

  const [accordionPriceIndex, setAccordionPriceIndex] = useState<
    string | number | undefined
  >(-1)
  const [accordionRedirectURLIndex, setAccordionRedirectURLIndex] = useState<
    string | number | undefined
  >(-1)

  const [priceWithoutFee, setPriceWithoutFee] = useState<number>(0)
  const price = watch('price')

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    onFormSubmitted({
      title: data.title,
      price: data.price,
      redirectTo: data.redirectTo,
    })
  }

  const handleAccordionPrice = (
    _: React.MouseEvent<HTMLDivElement>,
    titleProps: AccordionTitleProps
  ) => {
    const { index } = titleProps
    const newIndex = accordionPriceIndex === index ? -1 : index

    setAccordionPriceIndex(newIndex)
  }

  const handleAccordionRedirectURL = (
    _: React.MouseEvent<HTMLDivElement>,
    titleProps: AccordionTitleProps
  ) => {
    const { index } = titleProps
    const newIndex = accordionRedirectURLIndex === index ? -1 : index

    setAccordionRedirectURLIndex(newIndex)
  }

  useEffect(() => {
    const calculated = price > 0 ? price - price * (serviceFee / 100) : 0
    setPriceWithoutFee(+calculated.toFixed(2))
  }, [price, serviceFee])

  return (
    <Form onSubmit={handleSubmit(onSubmit)} size="big">
      <Grid stackable columns={1}>
        <Grid.Column>
          <p>
            This information will be displayed publicly so be careful what you
            share.
            <br />
            Title and price fields are required, other fields are optional.
          </p>
        </Grid.Column>

        <Grid.Column>
          <Header as="h2">Title:</Header>

          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Input
                {...field}
                error={errors.title && errors.title?.message}
                size="large"
                placeholder=""
                autoComplete="off"
                maxLength={100}
              />
            )}
          />
        </Grid.Column>

        <Grid.Column>
          <Header as="h2">Item Price:</Header>

          <Grid columns={2} stackable>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header as="h3">Put here the price for the buyer:</Header>

                <Controller
                  name="price"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Form.Input
                      {...field}
                      error={errors.price && errors.price?.message}
                      size="large"
                      placeholder=""
                      autoComplete="off"
                      maxLength={10}
                    />
                  )}
                />
              </Grid.Column>

              <Grid.Column>
                <Header as="h3">You will receive:</Header>

                <Form.Input
                  size="large"
                  value={priceWithoutFee}
                  maxLength={10}
                  readOnly
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Accordion styled fluid style={{ marginTop: '1em' }}>
            <Accordion.Title
              active={accordionPriceIndex === 0}
              index={0}
              onClick={handleAccordionPrice}
            >
              <Icon name="dropdown" />
              How do we charge platform commission?
            </Accordion.Title>
            <Accordion.Content active={accordionPriceIndex === 0}>
              <p>
                Our commission fee is just {serviceFee}%, which is charged to
                the seller upon the completion of each transaction. This means
                that sellers can keep more of their profits.
              </p>

              <p>
                Our commission fee covers the cost of maintaining and improving
                our platform, including server costs, development expenses, and
                customer support. By keeping our fees low, we aim to provide a
                fair and accessible platform for sellers of all sizes.
              </p>

              <p>
                Commission fee is automatically deducted from your account at
                the time of the transaction, so there are no surprises or hidden
                fees. We believe in being transparent and upfront about our
                fees, so that you can make informed decisions about pricing and
                profits.
              </p>
            </Accordion.Content>
          </Accordion>
        </Grid.Column>

        <Grid.Column>
          <Header as="h2">Redirect to URL after purchase:</Header>

          <Controller
            name="redirectTo"
            control={control}
            render={({ field }) => (
              <Form.Input
                {...field}
                error={errors.redirectTo && errors.redirectTo?.message}
                size="large"
                placeholder="Example: https://your-domain/thank-you-page"
                autoComplete="off"
                maxLength={255}
              />
            )}
          />

          <Accordion styled fluid style={{ marginTop: '1em' }}>
            <Accordion.Title
              active={accordionRedirectURLIndex === 0}
              index={0}
              onClick={handleAccordionRedirectURL}
            >
              <Icon name="dropdown" />
              How to use this URL?
            </Accordion.Title>
            <Accordion.Content active={accordionRedirectURLIndex === 0}>
              <p>
                If you have a specific URL that you would like the buyer to be
                directed to after completing their purchase, please provide it
                in the field below. Please note that when the buyer completes
                their purchase, the transaction hash, buyer address, and
                purchased item ID will be automatically added as query
                parameters to the URL you provide. This will allow you to easily
                track and verify the transaction details on your end.
              </p>

              <p>If you do not have a URL, you can leave this field blank.</p>
            </Accordion.Content>
          </Accordion>
        </Grid.Column>

        <Grid.Column>
          <Button
            content="Save"
            primary
            size="big"
            disabled={isSubmitting || !isValid}
          />
        </Grid.Column>
      </Grid>
    </Form>
  )
}

export default Component
