import request from '@/utils/request';

export async function findDefaultSelections() {
  return request('/demo/selections');
}
