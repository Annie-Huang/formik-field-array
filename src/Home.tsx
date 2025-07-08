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
import * as Yup from 'yup';
import { boolean, number, string } from 'yup';
import './Home.css';

const INITIAL_FORM_STATE = {
  fullName: '',
  donationsAmount: 0,
  termsAndConditions: false,
};

const FORM_VALIDATION = Yup.object().shape({
  fullName: string()
    .required('Your name is required')
    .min(2, 'Your name needs to be at least 3 characters')
    .max(10, 'Your name needs to be at most 10 characters'),
  donationsAmount: number().required().min(10), // will use the default of 'donationsAmount must be greater than or equal to 10' for min(10)
  termsAndConditions: boolean().required().isTrue(),
});

export const Home = () => {
  return (
    <Card>
      <CardContent>
        <Formik
          initialValues={{
            ...INITIAL_FORM_STATE,
          }}
          validationSchema={FORM_VALIDATION}
          onSubmit={async (values) => {
            console.log('my values', values);
            return new Promise((res) => setTimeout(res, 2500));
          }}
        >
          {({ values, errors, isSubmitting }) => {
            console.log('errors', errors);
            return (
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
                      Label={{
                        label: 'I accept the terms and conditions',
                        className: errors.termsAndConditions
                          ? 'errorColor'
                          : undefined,
                      }}
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
            );
          }}
        </Formik>
      </CardContent>
    </Card>
  );
};
