import React from 'react';
import { Card, CardContent, Grid } from '@mui/material';
import { Field, Form, Formik } from 'formik';

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
          onSubmit={() => {}}
        >
          {({ values, errors }) => (
            // If you want to keep autoComplete for the input, remove the below.
            <Form autoComplete='off'>
              <Grid container gap='20px'>
                <Grid size={{ xs: 12 }}>
                  <Field name='fullName' />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Field name='donationsAmount' type='number' />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Field name='termsAndConditions' />
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
