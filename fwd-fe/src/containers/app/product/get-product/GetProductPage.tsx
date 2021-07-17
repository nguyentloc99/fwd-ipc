import Card from 'components/card/Card';
import { Formik } from 'formik';
import React, { FC, useCallback, useMemo } from 'react';
import FormikRadio from 'components/formik/Radio';
import DatePicker from 'components/date-picker/DatePicker';
import FormikInput from 'components/formik/Input';
import FormikSelect from 'components/formik/Select';
import { Option } from 'react-select/src/filters';
import Button from 'components/button/Button';
import * as Yup from 'yup';
import { has, get } from 'lodash';
import { useDispatch } from 'react-redux';
import { getProductAction } from 'store/product/product.action';
import { PaymentFrequency } from 'models/entity/product/quotation-product.model';
import { GENDER } from 'models/common.model';
import classes from './get-product-page.module.scss';

interface FormValue {
  genderCd: GENDER;
  dob: Date;
  planCode: string;
  premiumPerYear: number;
  paymentFrequency: PaymentFrequency;
  saPerYear: number;
}

const GetProductPage: FC = () => {
  const dispatch = useDispatch();
  const handleSubmitForm = useCallback(
    (value: FormValue) => {
      dispatch(getProductAction.request(value));
    },
    [dispatch],
  );
  const initialValues = useMemo<FormValue>(
    () => ({
      genderCd: null,
      dob: new Date(),
      planCode: '',
      premiumPerYear: null,
      paymentFrequency: PaymentFrequency.YEARLY,
      saPerYear: undefined,
    }),
    [],
  );
  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        genderCd: Yup.string().nullable().required('Please select your gender'),
        planCode: Yup.string().nullable().required('Please select your plan'),
        premiumPerYear: Yup.string()
          .nullable()
          .required('Please input premium per year'),
      }),
    [],
  );
  const paymentFrequencyOptions = useMemo<Option[]>(
    () => [
      {
        data: {},
        label: 'Yearly',
        value: PaymentFrequency.YEARLY,
      },
      {
        data: {},
        label: 'Half a year',
        value: PaymentFrequency.HALFYEARLY,
      },
      {
        data: {},
        label: 'Quarterly',
        value: PaymentFrequency.QUARTERLY,
      },
      {
        data: {},
        label: 'Monthly',
        value: PaymentFrequency.MONTHLY,
      },
    ],
    [],
  );
  const planCodeOptions = useMemo<Option[]>(
    () => [
      {
        data: {},
        label: 'Package 1 - Benefit 200K',
        value: 'T11A20',
      },
      {
        data: {},
        label: 'Package 2 - Benefit 500K',
        value: 'T11A50',
      },
      {
        data: {},
        label: 'Package 3 - Benefit 1M',
        value: 'T11AM1',
      },
    ],
    [],
  );
  return (
    <div className={classes.container}>
      <Card>
        <h3>Insurance Calculation</h3>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleSubmitForm}
        >
          {({ handleSubmit, values, setFieldValue, errors }) => (
            <form onSubmit={handleSubmit} className={classes.formContainer}>
              <div className={classes.formItem}>
                <h5>Your Gender</h5>
                <div className={classes.radioContainer}>
                  <FormikRadio
                    name="genderCd"
                    value={GENDER.MALE}
                    label="Male"
                  />
                  <FormikRadio
                    name="genderCd"
                    value={GENDER.FEMALE}
                    label="Female"
                  />
                </div>
                {has(errors, 'genderCd') ? (
                  <p
                    data-puppeteer-id="gender-error-id"
                    className={'error-text'}
                  >
                    {get(errors, 'genderCd')}
                  </p>
                ) : null}
              </div>
              <div className={classes.formItem}>
                <h5>Date of Birth</h5>
                <DatePicker
                  value={values.dob}
                  onChange={(value) => {
                    setFieldValue('dob', value);
                  }}
                  autoOk={true}
                />
              </div>
              <div className={classes.formItem}>
                <h5>Choose your plan</h5>
                <div className={classes.radioContainer}>
                  {planCodeOptions.map((item) => (
                    <FormikRadio
                      key={item.value}
                      name="planCode"
                      value={item.value}
                      label={item.label}
                    />
                  ))}
                </div>
                {has(errors, 'planCode') ? (
                  <p data-puppeteer-id="plan-error-id" className={'error-text'}>
                    {get(errors, 'planCode')}
                  </p>
                ) : null}
              </div>
              <div className={classes.formItem}>
                <h5>Premium Per Year</h5>
                <FormikInput name="premiumPerYear" type="number" />
              </div>
              <div className={classes.formItem}>
                <h5>Payment Frequency</h5>
                <FormikSelect
                  inputId="paymentFrequencySelect"
                  name="paymentFrequency"
                  options={paymentFrequencyOptions}
                />
              </div>
              <div className={classes.formItem}>
                <h5>Sum Assured</h5>
                <FormikInput name="saPerYear" type="number" />
              </div>
              <Button type="submit">Calculate Insurance</Button>
            </form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default GetProductPage;
