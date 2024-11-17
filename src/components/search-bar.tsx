import { ChangeEvent, useState } from 'react';
import { useLazyGetPolicyholdersQuery } from '../services/policyholder.api';
import { useDispatch } from 'react-redux';
import { setCurrentPolicyholderCode } from '../stores/policyholder.slice';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

export const SearchBar = () => {
  const [searchCode, setSearchCode] = useState('');
  const [trigger] = useLazyGetPolicyholdersQuery();
  const handleSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchCode(e.target.value);
  };

  const dispatch = useDispatch();

  const handleSearch = () => {
    trigger({ code: searchCode });
    dispatch(setCurrentPolicyholderCode(searchCode));
  };

  return (
    <div className="flex gap-3 items-center justify-center">
      <div>保戶編號</div>
      <InputText
        placeholder="輸入保戶編號"
        value={searchCode}
        onChange={handleSearchValue}
      />
      <Button onClick={handleSearch}>查詢</Button>
    </div>
  );
};
