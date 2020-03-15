import React from 'react';
import { Form, Button, Divider, Input, Select } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { StateType } from '../../model';
import styles from './index.less';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};
interface Step1Props {
  data?: StateType['step'];
  dispatch?: Dispatch<any>;
}

const Step1: React.FC<Step1Props> = props => {
  const { dispatch, data } = props;
  const [form] = Form.useForm();

  if (!data) {
    return null;
  }
  const { validateFields } = form;
  const onValidateForm = async () => {
    const values = await validateFields();
    if (dispatch) {
      dispatch({
        type: 'slicesAndCreate/saveStepFormData',
        payload: values,
      });
      dispatch({
        type: 'slicesAndCreate/saveCurrentStep',
        payload: 'confirm',
      });
    }
  };
  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        layout="horizontal"
        className={styles.stepForm}
        hideRequiredMark
        // initialValues={data}
      >
        <Form.Item
          label="Slice name"
          name="receiverAccount"
          rules={[{ required: true, message: 'Input slice name' }]}
        >
          <Input placeholder="Input slice name" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="receiverName"
          rules={[{ required: true, message: 'Input description' }]}
        >
          <Input.TextArea placeholder="Input description" />
        </Form.Item>

        <Form.Item
          label="Tenant"
          name="payAccount"
          rules={[{ required: true, message: 'Select tenant' }]}
        >
          <Select placeholder="tenant 1">
            <Option value="tenant 1">Tenant 1</Option>
            <Option value="tenant 2">Tenant 2</Option>
          </Select>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
        >
          <Button type="primary" onClick={onValidateForm}>
            Next
          </Button>
        </Form.Item>
      </Form>
      <Divider style={{ margin: '40px 0 24px' }} />
    </>
  );
};

export default connect(({ slicesAndCreate }: { slicesAndCreate: StateType }) => ({
  data: slicesAndCreate.step,
}))(Step1);
