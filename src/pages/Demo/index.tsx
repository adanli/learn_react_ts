import React, {useState} from 'react';
import { Select } from 'antd';
import {DemoState} from './data';
const { Option } = Select;
import {findDefaultSelections} from './service'

interface SelectionOption {
  key: string,
  value: string
}


const Demo: React.FC<{}> = (props) => {

  const defaultSelectedKey: DemoState = {key: 1, selectedValue: 3}

  const [selectedKey, setSelectedKey] = useState<DemoState>(defaultSelectedKey)
  const [selectOptions, setSelectOptions] = useState<SelectionOption[]>([])

  function handleChange(value:any) {
    console.log(value)
    setSelectedKey({
      selectedValue: value,
      key: selectedKey.key + 1
    })
  }



  return (
    <div>
      <Select
        defaultValue={selectedKey.selectedValue}
        value={selectedKey?.selectedValue}
        style={{
          width: '100%',
        }}
        onChange={handleChange}
      >
        {selectOptions.map(option => { return (
          <Option value={option.key} key={option.key}>{option.value}</Option>
        )})}
      </Select>
    </div>
  );
};

export default Demo;
