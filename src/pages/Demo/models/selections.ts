import {Effect, Reducer} from 'umi'
import {findDefaultSelections} from '../service'
import {DemoState} from '../data'

export interface SelectionsType {
  namespace: 'selections',
  state: DemoState,
  effects: {
    fetch: Effect;
  };
  reducers: {
    list: Reducer<DemoState>;
  };

}

const SelectionsModel: SelectionsType = {
  namespace: 'selections',
  state: {
    selections: [],
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(findDefaultSelections);
      yield put({
        type: 'list',
        selections: response,
      });
    },
  },
  reducers: {
    list(state, {selections}) {
      return {
        ...state,
        selections: selections || [],
      };
    },
  }
}

export default SelectionsModel
