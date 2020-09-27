import {Effect, Reducer} from 'umi'
import {findDefaultSelections} from '../service'
import {DemoState} from '../data'

export interface SelectionsType {
  namespace: 'selections',
  state: DemoState,
  effects: {
    fetch: Effect;
    changeSelectedValue: Effect;
  };
  reducers: {
    list: Reducer<DemoState>;
    selectedValue: Reducer<DemoState>;
  };

}

const SelectionsModel: SelectionsType = {
  namespace: 'selections',
  state: {
    selections: [],
    selectedValue: 1,
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(findDefaultSelections);
      yield put({
        type: 'list',
        selections: response,
      });
    },
    *changeSelectedValue({value}, {call, put}) {
        yield put({
          type: 'selectedValue',
          selectedValue: value
        })
    },
  },
  reducers: {
    list(state, {selections}) {
      return {
        ...state,
        selections: selections || [],
      };
    },
    selectedValue(state, {selectedValue}) {
      return {
        ...state,
        selectedValue: selectedValue
      }
    },
  }
}

export default SelectionsModel
