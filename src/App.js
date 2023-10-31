import logo from './logo.svg';
import './App.css';
import { MainPage } from './Component/Main.page';
import Home from './Component/Main.page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TestApi } from './Component/TestApi';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();
function App() {
  return (

    <QueryClientProvider client={queryClient}>
      
      <div className="App">
        <Home />
        {/* <TestApi /> */}
      </div>
      <ReactQueryDevtools position='bottom'/>
      
    </QueryClientProvider>
    

  );
}

export default App;
