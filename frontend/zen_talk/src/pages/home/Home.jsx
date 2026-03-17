import MessageContainer from '../../components/messages/MessageContainer';
import Sidebar from '../../components/sidebar/Sidebar';

const Home = () => {
  return (
    <div className='flex items-center justify-center min-h-screen mx-auto'>
      <div className='flex w-full max-w-6xl h-[90vh] rounded-lg overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20'>
        {/* Sidebar */}
        <Sidebar />

        {/* Messages */}
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;
