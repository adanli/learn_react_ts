import {Effect, Reducer} from 'umi'
import {DemoState} from "@/pages/Demo/data";
import {findDefaultLists} from '../service'

export interface ListsType {
  namespace: 'lists',
  state: DemoState,
  effects: {
    fetch: Effect,
  },
  reducers: {
    list: Reducer<DemoState>
  }
}

const ListsModel: ListsType = {
  namespace: 'lists',
  state: {
    lists: [],
  },
  effects: {
    *fetch(_, {call, put}) {
      const response = yield call(findDefaultLists)
      yield put({
        type: 'list',
        list: response
      })
    }
  },
  reducers: {
    list(state, {list}) {
      return {
        ...state,
        lists: list||[],
      }
    }
  }
}

export default ListsModel
