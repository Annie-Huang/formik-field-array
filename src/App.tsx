import React from 'react';
import { Card, CardContent } from '@mui/material';
import { Form, Formik } from 'formik';

function App() {
  return (
    <Card>
      <CardContent>
        <Formik initialValues={{}} onSubmit={() => {}}>
          {({ values, errors }) => (
            <Form>
              <h1>Hello YouTube!</h1>

              <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

export default App;
