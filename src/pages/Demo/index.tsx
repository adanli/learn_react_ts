import React, {useEffect} from 'react';
import {Select, List, Divider, Card, Form, Input, Tooltip, Table, Tabs} from 'antd';
import {DemoState} from './data';
import {ConnectProps} from "@@/plugin-dva/connect";
import {connect} from "umi";
const { Option } = Select;
const {TabPane} = Tabs

interface SelectionOption {
  key: string,
  value: string
}

interface ListOption {
  value: string,
}


interface DemoProps extends ConnectProps {
  loading?: boolean;
  selections: SelectionOption[],
  lists: ListOption[],
  selectedValue: number,
}


const Demo: React.FC<DemoProps> = (props) => {

  const {
    dispatch,
    selections,
    lists,
    selectedValue,
  } = props

  // const defaultSelectedKey: DemoState = {key: 1, selectedValue: 3}

  // const [selectedKey, setSelectedKey] = useState<DemoState>(defaultSelectedKey)

  function handleChange(value:any) {
    console.log(value)
    if(dispatch) {
      dispatch({
        type: 'selections/changeSelectedValue',
        value: value,
      })
    }
  }

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'selections/fetch',
      });
      dispatch({
        type: 'lists/fetch',
      })
    }
  }, []);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const columns = [
    {
      title: 'key',
      dataIndex: 'key',
      key: 'key'
    }, {
      title: 'value',
      dataIndex: 'value',
      key: 'value'
    },
  ]

  return (
    <div>
      <div><span>Select</span>
        <Select
          defaultValue={selectedValue}
          value={selectedValue}
          style={{
            width: '100%',
          }}
          onChange={handleChange}
        >
          {selections.map(option => { return (
            <Option value={option.key} key={option.key}>{option.value}</Option>
          )})}
        </Select>
      </div>
      <Divider/>
      <div><span>List</span>
        <List>
          {(lists||[]).map(_ => <List.Item>{_.value}</List.Item>)}
        </List>
      </div>
      <Divider/>
      <div><span>Card</span>
        <Card title={selectedValue} bordered style={{width: '100%'}}>
          {lists.map(_ => <p style={{backgroundColor: `${parseInt(_.value)==selectedValue?'red':'white'}`}}>
            {parseInt(_.value)==selectedValue?<Tooltip title={_.value}>{_.value}</Tooltip>:`${_.value}`}
          </p>)}
        </Card>
      </div>
      <Divider/>
      <div><span>Form</span>
        <Form
          {...layout}
          name='basic'
        >
          <Form.Item label='name' name='name'>
            {/*<Input defaultValue={selectedValue} value={selectedValue} placeholder='enter your username'/>*/}
            <div>{selectedValue}</div>
          </Form.Item>
          <Form.Item label='password' name='password'>
            <Input.Password placeholder='enter your password'/>
          </Form.Item>
        </Form>
      </div>
      <Divider/>
      <div><span>Table</span>
        <Table dataSource={selections} columns={columns}/>
      </div>
      <Divider/>
      <div><span>Tabs</span>
        <Tabs defaultActiveKey={selectedValue+''} activeKey={selectedValue+''}>
          {selections.map(element => (
            <TabPane tab={element.key} key={element.key}>{element.value}</TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

// export default Demo;
export default connect(({ selections, lists, selectedValue }: DemoState) => ({ ...selections, ...lists }))(Demo);
