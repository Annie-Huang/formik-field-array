import React from 'react';
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import { Field, FieldArray, Form, Formik } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-mui';
import * as Yup from 'yup';
import { array, boolean, number, object, string, ValidationError } from 'yup';
import './Home.css';

const emptyDonation = { institution: '', percentage: 0 };

const INITIAL_FORM_STATE = {
  fullName: '',
  donationsAmount: 0,
  termsAndConditions: false,
  donations: [emptyDonation],
};

const FORM_VALIDATION = Yup.object().shape({
  fullName: string()
    .required('Your name is required')
    .min(2, 'Your name needs to be at least 3 characters')
    .max(10, 'Your name needs to be at most 10 characters'),
  donationsAmount: number().required().min(10), // will use the default of 'donationsAmount must be greater than or equal to 10' for min(10)
  termsAndConditions: boolean().required().isTrue(),
  donations: array(
    object({
      institution: string()
        .required('Institution name needed')
        .min(3, 'Institution name needs to be at least 3 characters')
        .max(10, 'Institution name needs to be at most 10 characters'),
      percentage: number()
        .required('Percentage needed')
        .min(1, 'Percentage needs to be at least 1%')
        .max(100, 'Percentage can be at most 100%'),
    }),
  )
    // In order to see the combine error message below, all the individual field in each item needs to pass first inside the array.
    .min(1)
    .max(3)
    .test((donations) => {
      console.log('donations=', donations);

      const sum = donations?.reduce(
        (acc, curr) => acc + (curr.percentage || 0),
        0,
      );

      if (sum !== 100) {
        return new ValidationError(
          `Percentage should be 100%, but you have ${sum}%`,
          undefined,
          'donations',
        );
      }

      return true;
    }),
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
          {({ values, errors, isSubmitting, isValid }) => {
            // console.log('errors', errors);
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

                  {/*<Field name='donations[0]' />*/}
                  {/*<Field name='donations[1]' />*/}
                  {/*<Field name='donations[2]' />*/}

                  {/*<Field name='donations.0.institution' />*/}
                  {/*<Field name='donations[0].percentage' />*/}
                  {/*<Field name='donations[1].institution' />*/}
                  {/*<Field name='donations[1].percentage' />*/}

                  <FieldArray name='donations'>
                    {({ push, remove }) => (
                      <React.Fragment>
                        <Grid>
                          <Typography variant='body2'>
                            All your donations
                          </Typography>
                        </Grid>

                        {values.donations.map((_, index) => (
                          <Grid container key={index} spacing={2}>
                            <Grid
                              size={{ xs: 12, sm: 'auto' }}
                              className='stretch'
                            >
                              <Field
                                fullWidth
                                name={`donations.${index}.institution`}
                                component={TextField}
                                label='Institution'
                                variant='standard'
                              />
                            </Grid>
                            <Grid
                              size={{ xs: 12, sm: 'auto' }}
                              className='stretch'
                            >
                              <Field
                                fullWidth
                                name={`donations.${index}.percentage`}
                                component={TextField}
                                type='number'
                                label='Percentage (%)'
                                variant='standard'
                              />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 'auto' }}>
                              <Button
                                disabled={isSubmitting}
                                onClick={() => remove(index)}
                              >
                                Delete
                              </Button>
                            </Grid>
                          </Grid>
                        ))}

                        <Grid>
                          {/* Only combine error will has the type of a string:
                              e.g. "donations": "donations field must have less than or equal to 3 items"
                              Normal field error will be:
                              "donations": [
                                {
                                  "institution": "Institution name needed",
                                  "percentage": "Percentage needs to be at least 1%"
                                }
                              ]
                          */}
                          {typeof errors.donations === 'string' ? (
                            <Typography color='error'>
                              {errors.donations}
                            </Typography>
                          ) : null}
                        </Grid>

                        <Grid>
                          <Button
                            disabled={isSubmitting}
                            variant='contained'
                            onClick={() => push(emptyDonation)}
                          >
                            Add Donation
                          </Button>
                        </Grid>
                      </React.Fragment>
                    )}
                  </FieldArray>

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
                      // disabled={!isValid || isSubmitting}
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
