import React from 'react';
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-mui';

const INITIAL_FORM_STATE = {
  fullName: '',
  donationsAmount: 0,
  termsAndConditions: false,
};

export const Home = () => {
  return (
    <Card>
      <CardContent>
        <Formik
          initialValues={{
            ...INITIAL_FORM_STATE,
          }}
          onSubmit={async (values) => {
            console.log('my values', values);
            return new Promise((res) => setTimeout(res, 2500));
          }}
        >
          {({ values, errors, isSubmitting }) => (
            // If you want to keep autoComplete for the input, remove the below.
            <Form autoComplete='off'>
              <Grid container direction='column' spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <Field
                    fullWidth
                    name='fullName'
                    component={TextField}
                    label='Full Name'
                    variant='standard'
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Field
                    fullWidth
                    name='donationsAmount'
                    type='number'
                    component={TextField}
                    label='Donation (£)'
                    variant='standard'
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Field
                    name='termsAndConditions'
                    type='checkbox'
                    component={CheckboxWithLabel}
                    Label={{ label: 'I accept the terms and conditions' }}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Button
                    disabled={isSubmitting}
                    variant='contained'
                    color='primary'
                    type='submit'
                    startIcon={
                      isSubmitting ? (
                        <CircularProgress size='0.9rem' />
                      ) : undefined
                    }
                  >
                    {isSubmitting ? 'Submitting' : 'Submit'}
                  </Button>
                </Grid>
              </Grid>

              <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};
