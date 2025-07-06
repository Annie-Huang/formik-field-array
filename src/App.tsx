import React from 'react';
import { Card, CardContent, Grid } from '@mui/material';
import { Field, Form, Formik } from 'formik';

const INITIAL_FORM_STATE = {
  fullName: '',
  donationsAmount: 0,
  termsAndConditions: false,
};

function App() {
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
            <Form>
              <Grid container>
                <Grid size={{ xs: 12 }}>
                  <Field name='fullName' />
                </Grid>
              </Grid>

              <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

export default App;
