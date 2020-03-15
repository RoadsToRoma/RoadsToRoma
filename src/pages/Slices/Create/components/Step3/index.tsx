import { Button, Result, Descriptions, Statistic } from 'antd';
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { StateType } from '../../model';
import styles from './index.less';

interface Step3Props {
  data?: StateType['step'];
  dispatch?: Dispatch<any>;
}

const Step3: React.FC<Step3Props> = props => {
  const { data, dispatch } = props;
  if (!data) {
    return null;
  }
  const { payAccount, receiverAccount, receiverName, amount } = data;
  const onFinish = () => {
    if (dispatch) {
      dispatch({
        type: 'slicesAndCreate/saveCurrentStep',
        payload: 'info',
      });
    }
  };
  const information = (
    <div className={styles.information}>
      <Descriptions column={1}>
        <Descriptions.Item label="Tenant"> {payAccount}</Descriptions.Item>
        <Descriptions.Item label="Slice name"> {receiverAccount}</Descriptions.Item>
        <Descriptions.Item label="Description"> {receiverName}</Descriptions.Item>
      </Descriptions>
    </div>
  );
  const extra = (
    <>
      <Button type="primary" onClick={onFinish}>
        Create Another Slice
      </Button>
    </>
  );
  return (
    <Result
      status="success"
      title="Slice has been created"
      subTitle="This may take 1~2 min to finish."
      extra={extra}
      className={styles.result}
    >
      {information}
    </Result>
  );
};

export default connect(({ slicesAndCreate }: { slicesAndCreate: StateType }) => ({
  data: slicesAndCreate.step,
}))(Step3);
