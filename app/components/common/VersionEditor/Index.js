import React, { Component } from 'react';
import { Modal, Button, Form, Input, Checkbox } from 'antd';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

const Dialog = (props) => {
  const updateFormCheck = (ev) => {
    ev.target.value = ev.target.checked;
    props.updateForm(ev);
  }
  return (
    <Modal title={props.info.modalTitle} visible={props.show}
      onOk={props.handleConfirm} onCancel={props.handleCancel}
    >
      <Form horizontal>
        <FormItem {...formItemLayout} label="版本号">
          <Input name="name" value={props.info.name} onChange={(ev) => {props.updateForm(ev)}} />
        </FormItem>
        <FormItem {...formItemLayout} label="版本描述">
          <Input name="desc" value={props.info.desc} onChange={(ev) => {props.updateForm(ev)}} />
        </FormItem>
        <FormItem {...formItemLayout} label="域名">
          <Checkbox name="enable_cache" checked={props.info.enable_cache} onChange={(ev) => {updateFormCheck(ev)}}>缓存数据</Checkbox>
        </FormItem>
      </Form>
    </Modal>
  );
}

export default Dialog
