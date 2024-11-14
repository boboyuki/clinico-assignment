
import './App.css'
import { SearchBar } from './components/search-bar'
import { OrganizationTree } from './components/organization-tree'
import { Box } from '@radix-ui/themes'

function App() {

  return (
    <Box width="100vw" height="100%" p="4">
      <SearchBar />
      <OrganizationTree />
    </Box>
  )
}

export default App
