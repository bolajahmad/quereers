import { useCallback, useEffect, useState } from "react";
import { UserAccount } from "../../models/shared";
import { SubsocialService } from "../../services";

export const useGetAccount = () => {
  const [accounts, setAccounts] = useState<UserAccount[] | null>(null);
  const [account, setAccount] = useState<UserAccount>();

  const setSelectedAccount = useCallback(
    (address: string) => {
      setAccount(accounts?.find((account) => account.address === address));
    },
    [accounts]
  );

  useEffect(() => {
    async function load() {
      const data = await SubsocialService.getAllAccounts();
      setAccounts(
        data.map(({ address, meta: { name, source } }) => ({
          address,
          name: name ?? "",
          source,
        }))
      );

      const { address, meta } = data[0];
      setAccount({
        address,
        name: meta.name ?? "",
        source: meta.source,
      });
    }
    load();
  }, []);

  return {
    account,
    accounts,
    isConnected: !!account,
    updateSelectedAccount: setSelectedAccount,
  };
};
