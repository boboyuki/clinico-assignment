import { http, HttpResponse } from 'msw';
import { Policyholder, policyholderMap } from './mock-data';

function getData(code: string, depth: number = 4): Policyholder[] {
  const policyholder = policyholderMap[code];
  if (!policyholder) return [];

  const result: Policyholder[] = [policyholder]; // 初始化結果陣列

  function setPolicyholder(node: Policyholder, currentDepth: number) {
    if (currentDepth > depth) return;

    if (node.l) {
      node.l.forEach((policyholder) => {
        const leftPolicyholder = policyholderMap[policyholder.code];
        if (leftPolicyholder) {
          result.push(leftPolicyholder);
          setPolicyholder(leftPolicyholder, currentDepth + 1);
        }
      });
    }

    if (node.r) {
      node.r.forEach((policyholder) => {
        const rightPolicyholder = policyholderMap[policyholder.code];
        if (rightPolicyholder) {
          result.push(rightPolicyholder);
          setPolicyholder(rightPolicyholder, currentDepth + 1);
        }
      });
    }
  }

  setPolicyholder(policyholder, 1); // 開始於深度1

  return result;
}

// 取得父節點資料回傳四層資料
function getParentNodeData(code: string): Policyholder[] {
  const policyholder = policyholderMap[code];
  if (!policyholder) return [];
  for (const key in policyholderMap) {
    const node = policyholderMap[key];
    if (
      node.l?.some((p) => p.code === code) ||
      node.r?.some((p) => p.code === code)
    ) {
      return getData(key);
    }
  }
  return [];
}

export const handlers = [
  http.get('/api/policyholders', ({ request }) => {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');

    return HttpResponse.json(code ? getData(code) : []);
  }),
  http.get('/api/policyholders/:code/top', (req) => {
    const code = req.params.code as string;
    return HttpResponse.json(code ? getParentNodeData(code) : []);
  }),
];
