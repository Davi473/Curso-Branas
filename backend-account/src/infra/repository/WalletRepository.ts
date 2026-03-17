import Account from "../../domain/Account";
import Wallet from "../../domain/Wallet";
import AccountAssetDAO from "../dao/AccountAssetDAO";
import AccountDAO from "../dao/AccountDAO";
import { inject } from "../di/Registry";

export default interface WalletRepository {
    getByAccountId (accountId: string): Promise<Wallet>;
    update (wallet: Wallet): Promise<void>;
}

export class WalletRepositoryDatabase implements WalletRepository {
    @inject("accountDAO")
    accountDAO!: AccountDAO;
    @inject("accountAssetDAO")
    accountAssetDAO!: AccountAssetDAO;

    async update(account: Account): Promise<void> {
        await this.accountAssetDAO.deleteByAccountId(account.accountId);
        for (const balance of account.balances) {
            await this.accountAssetDAO.save({ accountId: account.accountId, ...balance });
        }
    }

    async getByAccountId(accountId: string): Promise<Wallet> {
        const accountAssetsData = await this.accountAssetDAO.getByAccountId(accountId);
        const wallet = new Wallet(accountId);
        for (const accountAssetData of accountAssetsData) {
            wallet.balances.push({ assetId: accountAssetData.asset_id, quantity: parseFloat(accountAssetData.quantity) });
        }
        return wallet;
    }

}