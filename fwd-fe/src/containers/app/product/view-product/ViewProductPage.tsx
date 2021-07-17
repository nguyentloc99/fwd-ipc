import Button, { ButtonType } from 'components/button/Button';
import Card from 'components/card/Card';
import Table, { Column, Data } from 'components/table/Table';
import { ProductRouteConst } from 'constants/route.const';
import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classes from './view-product.module.scss';

const ViewProductPage: FC = () => {
  const { quotationProducts } = useSelector((state) => state.product);
  const columns = useMemo<Column[]>(
    () => [
      {
        dataKey: 'productId',
        title: 'Product',
      },
      {
        dataKey: 'productTypeCd',
        title: 'Product Type',
      },
      {
        dataKey: 'productFamilyCd',
        title: 'Product Family',
      },
      {
        dataKey: 'baseSumAssured',
        title: 'Sum Assured',
      },
      {
        dataKey: 'baseAnnualPremium',
        title: 'Annual Premium',
      },
      {
        dataKey: 'productTerm',
        title: 'Product Term',
      },
      {
        dataKey: 'productTerm',
        title: 'Product Term',
      },
      {
        dataKey: 'premiumPayingTerm',
        title: 'Paying Term',
      },
      {
        dataKey: 'paymentFrequencyCd',
        title: 'Payment Frequency',
      },
      {
        dataKey: 'planCode',
        title: 'Plan Code',
      },
    ],
    [],
  );
  const dataSource = useMemo<Data[]>(
    () =>
      quotationProducts.map((item) => ({
        key: item.productId,
        ...item,
      })),
    [quotationProducts],
  );
  return (
    <div className={classes.container}>
      <Card>
        <h3>Quotation Product</h3>
        <Table columns={columns} dataSource={dataSource} />
        <Link to={ProductRouteConst.GET_PRODUCT}>
          <Button type="button" buttonType={ButtonType.Info}>
            Back
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default ViewProductPage;
