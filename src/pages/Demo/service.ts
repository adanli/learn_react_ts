import request from '@/utils/request';


export async function findDefaultSelections() {
  return request('/demo/selections');
}

export async function findDefaultLists() {
  return request('/demo/lists')
}
