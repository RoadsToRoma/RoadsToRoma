import React from 'react';
import { Form, Alert, Button, Descriptions, Divider, Statistic, Input } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { StateType } from '../../model';
import styles from './index.less';
import Topology from '../../../../../components/Topology';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};
interface Step2Props {
  data?: StateType['step'];
  dispatch?: Dispatch<any>;
  submitting?: boolean;
}

const Step2: React.FC<Step2Props> = props => {
  const [form] = Form.useForm();
  const { data, dispatch, submitting } = props;
  if (!data) {
    return null;
  }
  const { validateFields, getFieldsValue } = form;
  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      dispatch({
        type: 'slicesAndCreate/saveStepFormData',
        payload: {
          ...data,
          ...values,
        },
      });
      dispatch({
        type: 'slicesAndCreate/saveCurrentStep',
        payload: 'info',
      });
    }
  };
  const onValidateForm = async () => {
    const values = await validateFields();
    if (dispatch) {
      dispatch({
        type: 'slicesAndCreate/submitStepForm',
        payload: {
          ...data,
          ...values,
        },
      });
    }
  };

  const { payAccount, receiverAccount, receiverName, amount } = data;
  return (
    <Form
      {...formItemLayout}
      form={form}
      layout="horizontal"
      className={styles.stepForm}
      initialValues={{ password: '123456' }}
    >
      <Descriptions column={1}>
        <Descriptions.Item label="Tenant"> {payAccount}</Descriptions.Item>
        <Descriptions.Item label="Slice name"> {receiverAccount}</Descriptions.Item>
        <Descriptions.Item label="Description"> {receiverName}</Descriptions.Item>
      </Descriptions>
      <Divider style={{ margin: '24px 0' }} />
      <Alert
        closable
        showIcon
        message="Select links below to create a slice topology"
        style={{ marginBottom: 24 }}
      />
      <Topology/>
      <Form.Item
        style={{ marginBottom: 8 }}
        wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: {
            span: formItemLayout.wrapperCol.span,
            offset: formItemLayout.labelCol.span,
          },
        }}
      >
        <Button type="primary" onClick={onValidateForm} loading={submitting}>
          Submit
        </Button>
        <Button onClick={onPrev} style={{ marginLeft: 8 }}>
          Prev
        </Button>
      </Form.Item>
    </Form>
  );
};
export default connect(
  ({
    slicesAndCreate,
    loading,
  }: {
    slicesAndCreate: StateType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    submitting: loading.effects['slicesAndCreate/submitStepForm'],
    data: slicesAndCreate.step,
  }),
)(Step2);
