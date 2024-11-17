import { useSelector } from 'react-redux';
import { RootState } from '../stores';
import {
  useGetPolicyholdersQuery,
  useLazyGetPolicyholdersQuery,
  useLazyGetTopPolicyholderQuery,
} from '../services/policyholder.api';
import {
  OrganizationChart,
  OrganizationChartNodeData,
} from 'primereact/organizationchart';
import { Policyholder } from '../stores/policyholder.slice';
import { useMemo } from 'react';
import { Button } from 'primereact/button';

type OrganizationNodeData = OrganizationChartNodeData & {
  name: string;
};

function transformPolicyHolders(
  policyholders: Policyholder[],
  currentSearchCode: string,
): OrganizationNodeData[] {
  const policyholderMap = policyholders.reduce(
    (acc, policyholder) => {
      acc[policyholder.code] = policyholder;
      return acc;
    },
    {} as Record<string, Policyholder>,
  );
  // 遞迴處理
  function transform(policyholder: Policyholder, parentCode: string) {
    const getClassNames = () => {
      if (policyholder.code === currentSearchCode) {
        return 'bg-green-500 p-2';
      }
      if (
        parentCode !== '' &&
        policyholder.introducer_code !== '' &&
        policyholder.introducer_code === parentCode
      ) {
        return 'bg-yellow-500 p-2';
      }
      return 'p-2';
    };
    const node: OrganizationNodeData = {
      label: policyholder.code,
      expanded: true,
      name: policyholder.name,
      className: getClassNames(),
      children: [
        ...policyholder.l.map((item) =>
          transform(policyholderMap[item.code], policyholder.code),
        ),
        ...policyholder.r.map((item) =>
          transform(policyholderMap[item.code], policyholder.code),
        ),
      ],
    };
    return node;
  }
  return policyholders.map((policyholder) => transform(policyholder, ''));
}

const getNodeTemplate =
  (currentSearchCode: string) => (node: OrganizationNodeData) => {
    const [getTopPolicyholder] = useLazyGetTopPolicyholderQuery();
    const [getPolicyholders] = useLazyGetPolicyholdersQuery();
    const handleGoBack = () => {
      if (node.label) {
        getTopPolicyholder({ code: node.label });
      }
    };
    const handleLink = () => {
      if (node.label) {
        getPolicyholders({ code: node.label });
      }
    };

    return (
      <div className="flex flex-col">
        <Button className="p-0" label={node.label} link onClick={handleLink} />
        <p>{node.name}</p>
        {node.label === currentSearchCode && (
          <button className="text-sm border-none" onClick={handleGoBack}>
            回上一層
          </button>
        )}
      </div>
    );
  };

export const OrganizationTree: React.FC = () => {
  // 預設使用0000000001的保戶
  useGetPolicyholdersQuery({ code: '0000000001' });
  const { policyholders, currentCode } = useSelector(
    (state: RootState) => state.policyholder,
  );
  const policyholderData = useMemo(
    () => transformPolicyHolders(policyholders, currentCode),
    [policyholders, currentCode],
  );
  if (policyholderData.length === 0) {
    return null;
  }
  return (
    <div className="my-4 flex justify-start overflow-x-auto">
      <OrganizationChart
        className="w-full h-full"
        value={policyholderData}
        selectionMode="single"
        nodeTemplate={getNodeTemplate(currentCode)}
      />
    </div>
  );
};
