import React, {useEffect, useState} from 'react';
import { Select, List, Divider, Card } from 'antd';
import {DemoState} from './data';
import {ConnectProps} from "@@/plugin-dva/connect";
import {connect} from "umi";
const { Option } = Select;

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
}


const Demo: React.FC<DemoProps> = (props) => {

  const {
    dispatch,
    selections,
    lists,
  } = props

  const defaultSelectedKey: DemoState = {key: 1, selectedValue: 3}

  const [selectedKey, setSelectedKey] = useState<DemoState>(defaultSelectedKey)

  function handleChange(value:any) {
    console.log(value)
    setSelectedKey({
      selectedValue: value,
      key: selectedKey.key?selectedKey.key + 1:1
    })
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


  return (
    <div>
      <div><span>Select</span>
        <Select
          defaultValue={selectedKey.selectedValue}
          value={selectedKey?.selectedValue}
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
        <Card></Card>
      </div>
    </div>
  );
};

// export default Demo;
export default connect(({ selections, lists }: DemoState) => ({ ...selections, ...lists }))(Demo);
