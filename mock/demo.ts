import {Request, Response} from 'express'

export interface DemoType {
  key: number,
  value: number
}

const arr: DemoType[] = [
  {key: 1, value: 1},
  {key: 2, value: 2},
  {key: 3, value: 3},
]

function lists(req: Request, res: Response) {
  res.status(200).send(arr)
}

export default {
  // 查询selections的列表
  'GET /demo/selections': lists,
  // 查询lists的列表
  'GET /demo/lists': lists,
};
