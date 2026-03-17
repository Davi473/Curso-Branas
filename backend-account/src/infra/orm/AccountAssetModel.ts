import { column, Model, model } from "./ORM";

@model("ccca", "account_asset")
export class AccountAssetModel extends Model {
    @column("account_id")
    accountId: string;
    @column("asset_id")
    assetId: string;
    @column("quantity")
    quantity: number;

    constructor(accountId: string, assetId: string, quantity: number) {
        super();
        this.accountId = accountId;
        this.assetId = assetId;
        this.quantity = quantity;
    }
}