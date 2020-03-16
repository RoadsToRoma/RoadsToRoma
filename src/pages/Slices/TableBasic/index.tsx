import React from "react";
import styles from "./index.less";
import { Table, Divider, Tag } from "antd";
import {DeleteOutlined,SettingOutlined} from '@ant-design/icons';

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: text => <a>{text}</a>
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description"
  },
  {
    title: "Tenants",
    key: "tenants",
    dataIndex: "tenants",
    render: tenants => (
      <span>
        {tenants.map(tag => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag}
            </Tag>
          );
        })}
      </span>
    )
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <span>
        <a><SettingOutlined /> Program</a>
        <Divider type="vertical" />
        <a><DeleteOutlined /> Delete</a>
      </span>
    )
  }
];

const data = [
  {
    key: "1",
    name: "Slice for 4K",
    age: 32,
    description: "Slice for 4K experiments",
    tenants: ["tenant 1"]
  },
  {
    key: "2",
    name: "Science slice",
    age: 42,
    description: "Slice for science experiments",
    tenants: ["tenant 1"]
  },
  {
    key: "3",
    name: "PCL test slice",
    age: 32,
    description: "Test slice",
    tenants: ["tenant 2"]
  }
];

export default () => (
  <div className={styles.container}>
    <div id="components-table-demo-basic">
      <Table columns={columns} dataSource={data} />
    </div>
  </div>
);
