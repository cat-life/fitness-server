import React, { Component } from 'react';
import { Modal, Button, Form, Input } from 'antd';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

const Dialog = (props) => {
  return (
    <Modal title={props.info.modalTitle} visible={props.show}
      onOk={props.handleConfirm} onCancel={props.handleCancel}
    >
      <Form horizontal>
        <FormItem {...formItemLayout} label="项目别名">
          <Input name="name" value={props.info.name} onChange={(ev) => {props.updateForm(ev)}} />
        </FormItem>
        <FormItem {...formItemLayout} label="项目描述">
          <Input name="desc" value={props.info.desc} onChange={(ev) => {props.updateForm(ev)}} />
        </FormItem>
        <FormItem {...formItemLayout} label="域名">
          <Input name="api" value={props.info.api} onChange={(ev) => {props.updateForm(ev)}} />
        </FormItem>
      </Form>
    </Modal>
  );
}

export default Dialog
