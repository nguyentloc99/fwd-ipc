import React, { FC } from 'react';
import appRoutes from 'routes/app.route';
import CustomSwitch from 'routes/custom-switch/CustomSwitch';

const AppLayout: FC = () => {
  return (
    <div>
      <CustomSwitch routes={appRoutes} />
    </div>
  );
};

export default AppLayout;
