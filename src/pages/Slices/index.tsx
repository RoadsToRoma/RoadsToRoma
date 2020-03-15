import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import styles from './index.less';
import Topology from '../../components/Topology';

export default () => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <PageHeaderWrapper className={styles.main}>
      <div style={{ paddingTop: 100, textAlign: 'center' }}>
        <Topology/>
        <Spin spinning={loading} size="large" />
      </div>
    </PageHeaderWrapper>
  );
};
