import { CommonConstant } from "src/app/shared/constants/common.constant";

export class RefreshTokenModel
{
    public userId = CommonConstant.ZERO_GUID;

    public refreshToken = "";

    public expriedTime!: Date;
}
