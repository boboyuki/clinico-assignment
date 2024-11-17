import './App.css';
import { SearchBar } from './components/search-bar';
import { OrganizationTree } from './components/organization-tree';

function App() {
  return (
    <div className="w-full h-full p-4">
      <SearchBar />
      <OrganizationTree />
    </div>
  );
}

export default App;
