// https://github.com/MoralisWeb3/react-moralis#usemoralis
import { useMoralis } from 'react-moralis';
import { useEffect } from 'react';

const ManualHeader = () => {
  const {
    enableWeb3,
    deactivateWeb3,
    isWeb3EnableLoading,
    account,
    isWeb3Enabled,
    Moralis,
  } = useMoralis();

  // Check connection
  useEffect(() => {
    if (isWeb3Enabled) {
      return;
    }
    if (typeof window !== 'undefined') {
      if (window.localStorage.getItem('connected')) {
        enableWeb3();
      }
    }
  }, [isWeb3Enabled]);

  // Check disconnection
  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      console.log(`Account changed to ${account}`);
      if (account == null) {
        window.localStorage.removeItem('connected');
        deactivateWeb3();
        console.log('No account found!');
      }
    });
  }, []);

  const handleConnect = async () => {
    await enableWeb3();
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('connected', 'injected');
    }
  };

  return (
    <div>
      {account ? (
        <div>
          Connected to {account.slice(0, 6)}...
          {account.slice(account.length - 4)}
        </div>
      ) : (
        <button disabled={isWeb3EnableLoading} onClick={handleConnect}>
          Connect
        </button>
      )}
    </div>
  );
};

export default ManualHeader;
