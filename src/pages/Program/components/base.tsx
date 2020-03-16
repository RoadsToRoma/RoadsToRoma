import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Select, Upload, Form, message, Divider } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';

import { connect } from 'dva';
import { CurrentUser } from '../data.d';
import GeographicView from './GeographicView';
import PhoneView from './PhoneView';
import styles from './BaseView.less';
import Topology from '../../../components/Topology';
import Editor from './Editor';
import { SettingOutlined, FileSearchOutlined } from '@ant-design/icons';

const { Option } = Select;

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }: { avatar: string }) => (
  <>
    <div className={styles.avatar_title}>
      <FormattedMessage id="program.basic.avatar" defaultMessage="Avatar" />
    </div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          <FormattedMessage id="program.basic.change-avatar" defaultMessage="Change avatar" />
        </Button>
      </div>
    </Upload>
  </>
);
interface SelectItem {
  label: string;
  key: string;
}

const validatorGeographic = (
  _: any,
  value: {
    province: SelectItem;
    city: SelectItem;
  },
  callback: (message?: string) => void,
) => {
  const { province, city } = value;
  if (!province.key) {
    callback('Please input your province!');
  }
  if (!city.key) {
    callback('Please input your city!');
  }
  callback();
};

const validatorPhone = (rule: any, value: string, callback: (message?: string) => void) => {
  const values = value.split('-');
  if (!values[0]) {
    callback('Please input your area code!');
  }
  if (!values[1]) {
    callback('Please input your phone number!');
  }
  callback();
};

interface BaseViewProps {
  currentUser?: CurrentUser;
}

class BaseView extends Component<BaseViewProps> {
  view: HTMLDivElement | undefined = undefined;

  getAvatarURL() {
    const { currentUser } = this.props;
    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar;
      }
      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }
    return '';
  }

  getViewDom = (ref: HTMLDivElement) => {
    this.view = ref;
  };

  handleFinish = () => {
    message.success(formatMessage({ id: 'program.basic.update.success' }));
  };

  render() {
    const { currentUser } = this.props;

    return (
      <div className={styles.baseView} style={{width: '100%'}} ref={this.getViewDom}>
        <Topology showSlice={false}/>
        {/* <Divider style={{ margin: '40px 0 24px' }} /> */}
        <div style={{width: '100%', display: 'block'}}>
        <Editor/>
        </div>
        <p></p>
        <Input.Search
          placeholder="Requirements to be verified. e.g., SRC.*DST"
          enterButton={<span><FileSearchOutlined /> Verify</span>}
          size="large"
          onSearch={value => console.log(value)}
        />
        <p></p>
        <Button type="primary" block icon={<SettingOutlined />}>Compiler & Deploy</Button>
      </div>
    );
  }
}

export default connect(
  ({ program }: { program: { currentUser: CurrentUser } }) => ({
    currentUser: program.currentUser,
  }),
)(BaseView);
