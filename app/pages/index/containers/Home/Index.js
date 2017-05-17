import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Icon, Popover, message, Modal } from 'antd';
import './Index.scss';
import * as listAction from 'main/actions/list';
import * as modalAction from 'main/actions/modal';
import ProjectEditor from 'app/components/common/ProjectEditor';
const confirm = Modal.confirm;

class Home extends Component {

    handleClickAdd() {
      this.props.openEditor({modalTitle: 'Add Project'});
    }

    handleClickEdit(id, index) {
      this.props.openEditor(Object.assign({}, this.props.project.list[index], {modalTitle: 'Edit Project'}));
    }

    handleClickDelete(id) {
      let self = this;
      confirm({
        title: '删除此项目？',
        onOk() {
          self.props.deleteItem('project', {id: id});
        },
        onCancel() {}
      });
    }

    handleConfirm() {
      if (!this.props.modal.editInfo.name) {
        message.warning('Name is nessary.');
        return;
      }
      this.props.confirmEditor('project', this.props.modal.editInfo);
    }

    handleCancel() {
      this.props.closeEditor();
    }

    handleFormUpdate(ev) {
      this.props.updateEditor({
        name: ev.target.name,
        value: ev.target.value
      });
    }

    componentDidMount() {
      this.props.fetchList('project');
    }

    renderPopContent(id, index) {
      return (
        <div className="edit-pop">
          <Icon type="edit" onClick={(ev) => {this.handleClickEdit(id, index, ev)}}/>
          <Icon type="delete" onClick={(ev) => {this.handleClickDelete(id, ev)}} />
        </div>
      );
    }

    render() {
      let { project, modal } = this.props;

      return (
        <div className="container">
          <ul className="clearfix block-list project-list">
            <li>
              <a className="block-item-plus" onClick={(ev) => this.handleClickAdd(ev)}><Icon type="plus" /></a>
            </li>
            {project.list.map((item, index) => {
              return (
                <li key={item.id}>
                  <h2><Link to={`/project/${item.id}`}>{item.name}</Link></h2>
                  <p>{item.desc}</p>
                  <p>{item.api}</p>
                  <Popover content={this.renderPopContent(item.id, index)} trigger="hover">
                    <Icon type="setting" />
                  </Popover>
                </li>
              );
            })}
          </ul>
          <ProjectEditor
            info={modal.editInfo}
            show={modal.show}
            updateForm={(ev) => {this.handleFormUpdate(ev)}}
            handleCancel={() => {this.handleCancel()}}
            handleConfirm={() => {this.handleConfirm()}}
          />
        </div>
      );
    }
}

export default connect(
  (state) => ({project: state.project, modal: state.modal}),
  (dispatch) => bindActionCreators({ ...listAction, ...modalAction }, dispatch)
)(Home);
