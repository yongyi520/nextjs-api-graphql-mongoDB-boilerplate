import "../styles.css";
import Header from "../components/header/Header";
function App({ Component, pageProps }) {
  return (
    <div className="w-full overflow-hidden">
      <Header />
      <div className="h-screen w-full pt-20 flex items-center flex-col">
        <div className="h-full w-full overflow-auto flex flex-col justify-between">
          <Component {...pageProps} />
          <div className="bg-gray-200 h-32 inset-x-0 bottom-0 flex-grow-0 flex-shrink-0 flex flex-col items-center">
            <div className="md:w-4/5 md:px-0 sm:px-16 sm:w-full flex flex-col h-full">
              <div className="flex-1 flex flex-row justify-between">
                <div className='flex-1'>
                  section 1
                </div>
                <div className='flex-1'>
                  section 2
                </div>
                <div className='flex-1'>
                  section 3
                </div>
              </div>
              <div className="flex-shrink-0 h-6">© 2020</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
